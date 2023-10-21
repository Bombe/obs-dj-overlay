import React from 'react'
import {act, render, screen} from '@testing-library/react'
import {within} from '@testing-library/dom'
import {expect} from 'chai'

import {doNothing, user} from '../../../utils/tests'
import WithCrateService from '../../../contexts/crateService'
import WithSearchService from '../../../contexts/searchService'
import {CrateAdmin} from './CrateAdmin'

describe('The Crate Admin', () => {

    const createRecord = (artist, title, cover) => ({artist, title, cover})

    const createRecordResponse = records => Promise.resolve({json: () => Promise.resolve(records)})
    const createStatusResponse = status => Promise.resolve({status})

    const defaultCrateService = {
        getRecords: () => createRecordResponse([]),
        importRecords: () => createStatusResponse(200),
        reset: () => Promise.resolve()
    }

    const prepareCrateService = (tracks, secondTracks) => {
        let firstAccess = true
        return {
            ...defaultCrateService,
            getRecords: () => {
                if (firstAccess || (secondTracks === undefined)) {
                    firstAccess = false
                    return createRecordResponse(tracks)
                }
                return createRecordResponse(secondTracks)
            }
        }
    }

    it('should load the crate from the service', async () => {
        const crateService = prepareCrateService([createRecord('Artist', 'Title', 'Cover')])
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        expect(screen.queryAllByTitle('record')).to.have.lengthOf(1)
    })

    it('should generate IDs for the entries in the crate', async () => {
        const crateService = prepareCrateService([
            createRecord('C', 'F', ''), createRecord('B', 'E', ''), createRecord('F', 'A', ''),
            createRecord('C', 'E', ''), createRecord('B', 'X'), createRecord('A', 'F', '')
        ])
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        const ids = new Set(Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => element.getAttribute('data-id')))
        expect(ids).to.have.lengthOf(6)
    })

    it('should sort entries in the crate', async () => {
        const crateService = prepareCrateService([
            createRecord('C', 'F', ''), createRecord('B', 'E', ''), createRecord('F', 'A', ''),
            createRecord('C', 'E', ''), createRecord('B', 'X'), createRecord('A', 'F', '')
        ])
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        expect(Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')}))).to.be.deep.eql([
            {artist: 'A', title: 'F'}, {artist: 'B', title: 'E'}, {artist: 'B', title: 'X'}, {artist: 'C', title: 'E'}, {artist: 'C', title: 'F'}, {artist: 'F', title: 'A'}
        ])
    })

    it('should have a button labeled "search"', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByRole('button', {name: /search/i})).to.exist
    })

    it('should have an input field for the search', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByLabelText(/search/i)).to.exist
    })

    it('should show only tracks that contain "a" in the title or the artist if an "a" is entered into the search field', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''},
            {artist: 'GHI', title: 'jkl', cover: ''}, {artist: 'JKL', title: 'abc', cover: ''}
        ])
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'a')
        const shownRecords = Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')}))
        expect(shownRecords).to.be.deep.eql([
            {artist: 'ABC', title: 'def'}, {artist: 'JKL', title: 'abc'}
        ])
    })

    it('should can search for multiple words', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''},
            {artist: 'GHI', title: 'jkl', cover: ''}, {artist: 'JKL', title: 'abc', cover: ''}
        ])
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'ab jk')
        const shownRecords = Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')}))
        expect(shownRecords).to.be.deep.eql([
            {artist: 'JKL', title: 'abc'}
        ])
    })

    it('should apply filters when reloading tracks', async () => {
        const crateService = prepareCrateService(
            [{artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}],
            [{artist: 'GHI', title: 'jkl', cover: ''}, {artist: 'JKL', title: 'abc', cover: ''}]
        )
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'a')
        await user.click(screen.getByRole('button', {name: /reload/i}))
        const shownRecords = Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')}))
        expect(shownRecords).to.be.deep.eql([{artist: 'JKL', title: 'abc'}])
    })

    it('should call the provided setters if there is only one match for the search and enter is pressed', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}, {artist: 'GHI', title: 'jkl', cover: ''}
        ])
        let calledSetters = {}
        const setArtist = artist => calledSetters = {...calledSetters, artist}
        const setTitle = title => calledSetters = {...calledSetters, title}
        const setCover = cover => calledSetters = {...calledSetters, cover}
        render(<WithCrateService crateService={crateService}><CrateAdmin setArtist={setArtist} setTitle={setTitle} setCover={setCover} scrollToTrack={doNothing}/></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'a{Enter}')
        expect(calledSetters).to.be.deep.eql({artist: 'ABC', title: 'def', cover: ''})
    })

    it('should not call the provided setters if there is more than one match for the search and enter is pressed', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}, {artist: 'GHI', title: 'jkl', cover: ''}, {artist: 'JKL', title: 'abc', cover: ''}
        ])
        let setterCalled = false
        const setArtist = artist => setterCalled = true
        const setTitle = title => setterCalled = true
        const setCover = cover => setterCalled = true
        render(<WithCrateService crateService={crateService}><CrateAdmin setArtist={setArtist} setTitle={setTitle} setCover={setCover} scrollToTrack={doNothing}/></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'a{Enter}')
        expect(setterCalled).to.be.false
    })

    it('should clear the search field if there is only one match for the search and enter is pressed', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}, {artist: 'GHI', title: 'jkl', cover: ''}
        ])
        render(<WithCrateService crateService={crateService}><CrateAdmin setArtist={doNothing} setTitle={doNothing} setCover={doNothing} scrollToTrack={doNothing}/></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'a{Enter}')
        expect(screen.getByLabelText(/search/i).value).to.be.empty
    })

    it('should use the search service if enter is pressed when there are no matches in crate', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}, {artist: 'GHI', title: 'jkl', cover: ''}
        ])
        let providedTerms
        const searchService = {
            search: terms => {
                providedTerms = terms
                return Promise.resolve([])
            }
        }
        render(<WithCrateService crateService={crateService}><WithSearchService searchService={searchService}><CrateAdmin setArtist={doNothing} setTitle={doNothing} setCover={doNothing} scrollToTrack={doNothing}/></WithSearchService></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'xyz{Enter}')
        expect(providedTerms).to.be.eql(['xyz'])
    })

    it('should process the search results and display them', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}, {artist: 'GHI', title: 'jkl', cover: ''}
        ])
        const searchService = {
            search: () => {
                return Promise.resolve([{artists: ['A', 'B'], title: 'XYZ', mix: 'Test Mix', cover: 'img:a'}])
            }
        }
        render(<WithCrateService crateService={crateService}><WithSearchService searchService={searchService}><CrateAdmin setArtist={doNothing} setTitle={doNothing} setCover={doNothing} scrollToTrack={doNothing}/></WithSearchService></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'xyz{Enter}')
        const shownRecords = Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')}))
        expect(shownRecords).to.be.eql([{artist: 'A, B', title: 'XYZ (Test Mix)'}])
    })

    it('should clear the search field after search results are shown', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}, {artist: 'GHI', title: 'jkl', cover: ''}
        ])
        const searchService = {
            search: () => {
                return Promise.resolve([{artists: ['A', 'B'], title: 'XYZ', mix: 'Test Mix', cover: 'img:a'}])
            }
        }
        render(<WithCrateService crateService={crateService}><WithSearchService searchService={searchService}><CrateAdmin setArtist={doNothing} setTitle={doNothing} setCover={doNothing} scrollToTrack={doNothing}/></WithSearchService></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'xyz{Enter}')
        expect(screen.getByLabelText(/search/i).value).to.be.empty
    })

    it('should reload the crate if entry is pressed in an empty search field after the search', async () => {
        const crateService = prepareCrateService([
            {artist: 'ABC', title: 'def', cover: ''}, {artist: 'DEF', title: 'ghi', cover: ''}, {artist: 'GHI', title: 'jkl', cover: ''}
        ])
        const searchService = {
            search: () => {
                return Promise.resolve([{artists: ['A', 'B'], title: 'XYZ', mix: 'Test Mix', cover: 'img:a'}])
            }
        }
        render(<WithCrateService crateService={crateService}><WithSearchService searchService={searchService}><CrateAdmin setArtist={doNothing} setTitle={doNothing} setCover={doNothing} scrollToTrack={doNothing}/></WithSearchService></WithCrateService>)
        await user.type(screen.getByLabelText(/search/i), 'xyz{Enter}')
        await user.type(screen.getByLabelText(/search/i), '{Enter}')
        const shownRecords = Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')}))
        expect(shownRecords).to.be.deep.eql([{artist: 'ABC', title: 'def'}, {artist: 'DEF', title: 'ghi'}, {artist: 'GHI', title: 'jkl'}])
    })

    it('should have a button labeled "import"', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByRole('button', {name: /import/i})).to.exist
    })

    it('should have an input field for the import', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByLabelText(/import/i)).to.exist
    })

    it('should not import anything if input field does not contain anything', async () => {
        let importCalled = false
        const crateService = {...defaultCrateService, importRecords: () => importCalled = true}
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.click(screen.getByRole('button', {name: /import/i}))
        expect(importCalled).to.be.false
    })

    it('should import a single track from input field', async () => {
        let importedTrack = []
        const crateService = {
            ...defaultCrateService,
            getRecords: () => createRecordResponse(importedTrack),
            importRecords: string => {
                importedTrack = JSON.parse(string)
                return defaultCrateService.importRecords()
            },
        }
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.type(screen.getByLabelText(/import/i), '[[{{"artist":"Artist","title":"Title","cover":"Cover"}]')
        await user.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.queryAllByTitle('record')).to.have.lengthOf(1)
    })

    it('should clear the input field after successful importing', async () => {
        render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>)
        await user.type(screen.getByLabelText(/import/i), '[[{{"artist":"Artist","title":"Title","cover":"Cover"}]')
        await user.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.getByLabelText(/import/i).value).to.be.empty
    })

    it('should not clear the input field after unsuccessful importing', async () => {
        const crateService = {...defaultCrateService, importRecords: () => createStatusResponse(400)}
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.type(screen.getByLabelText(/import/i), '[[{{"artist":"Artist","tit')
        await user.click(screen.getByRole('button', {name: /import/i}))
        expect(screen.getByLabelText(/import/i).value).to.be.eql('[{"artist":"Artist","tit')
    })

    it('should have a button to reset the crates', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByRole('button', {name: /reset/i})).to.exist
    })

    it('should tell the crate service to reset the crate when reset button is pressed', async () => {
        let resetCalled = false
        const crateService = {
            ...defaultCrateService, reset: () => {
                resetCalled = true
                return Promise.resolve()
            }
        }
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.click(screen.getByRole('button', {name: /reset/i}))
        expect(resetCalled).to.be.true
    })

    it('should have a reload button', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByRole('button', {name: /reload/i})).to.exist
    })

    it('should reload the crate if the reload button is pressed', async () => {
        const crateService = prepareCrateService(
            [{artist: 'Artist 1', title: 'Title 1', cover: ''}, {artist: 'Artist 2', title: 'Title 2', cover: ''}],
            [{artist: 'Artist 3', title: 'Title 3', cover: ''}, {artist: 'Artist 4', title: 'Title 4', cover: ''}, {artist: 'Artist 5', title: 'Title 5', cover: ''}]
        )
        render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
        await user.click(screen.getByRole('button', {name: /reload/i}))
        expect(Array.from(document.body.querySelectorAll('[title=\'record\']')).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')})))
            .to.be.deep.eql([{artist: 'Artist 3', title: 'Title 3'}, {artist: 'Artist 4', title: 'Title 4'}, {artist: 'Artist 5', title: 'Title 5'}])
    })

    it('should have a button labeled “load” in each row of the table', async () => {
        const crateService = prepareCrateService([
            createRecord('C', 'F', ''), createRecord('B', 'E', ''), createRecord('F', 'A', '')
        ])
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        const rows = Array.from(document.body.querySelectorAll('[title=\'record\']'))
        expect(within(rows.at(0)).getByRole('button', {title: /load/i})).to.exist
        expect(within(rows.at(1)).getByRole('button', {title: /load/i})).to.exist
        expect(within(rows.at(2)).getByRole('button', {title: /load/i})).to.exist
    })

    it('should call the provided setters when a load button is clicked', async () => {
        let calledSetters = {}
        const setArtist = artist => calledSetters = {...calledSetters, artist}
        const setTitle = title => calledSetters = {...calledSetters, title}
        const setCover = cover => calledSetters = {...calledSetters, cover}
        const crateService = prepareCrateService([
            createRecord('C', 'F', 'B'), createRecord('B', 'E', 'C'), createRecord('F', 'A', 'D')
        ])
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin setArtist={setArtist} setTitle={setTitle} setCover={setCover} scrollToTrack={doNothing}/></WithCrateService>))
        const rows = Array.from(document.body.querySelectorAll('[title=\'record\']'))
        await user.click(within(rows.at(1)).getByRole('button', {title: /load/i}))
        expect(calledSetters).to.deep.eql({artist: 'C', title: 'F', cover: 'B'})
    })

    it('should call the provided scroll function when a load button is clicked', async () => {
        let scrollToTrackCalled = false
        const crateService = prepareCrateService([
            createRecord('C', 'F', 'B'), createRecord('B', 'E', 'C'), createRecord('F', 'A', 'D')
        ])
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin setArtist={doNothing} setTitle={doNothing} setCover={doNothing} scrollToTrack={() => scrollToTrackCalled = true}/></WithCrateService>))
        const rows = Array.from(document.body.querySelectorAll('[title=\'record\']'))
        await user.click(within(rows.at(1)).getByRole('button', {title: /load/i}))
        expect(scrollToTrackCalled).to.be.true
    })

})
