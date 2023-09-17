import React from "react"
import {act, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {expect} from 'chai'

import WithCrateService from "../../CrateServiceContext";
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

    it('should load the crate from the service', async () => {
        const crateService = {...defaultCrateService, getRecords: () => createRecordResponse([createRecord('Artist', 'Title', 'Cover')])}
        await act(async () => await render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        expect(screen.queryAllByTitle("record")).to.have.lengthOf(1)
    });

    it('should generate IDs for the entries in the crate', async () => {
        const crateService = {
            ...defaultCrateService, getRecords: () => createRecordResponse([
                createRecord('C', 'F', ''), createRecord('B', 'E', ''), createRecord('F', 'A', ''),
                createRecord('C', 'E', ''), createRecord('B', 'X'), createRecord('A', 'F', '')
            ])
        }
        await act(async () => await render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        const ids = new Set(Array.from(document.body.querySelectorAll("[title='record']")).map(element => element.getAttribute('data-id')))
        expect(ids).to.have.lengthOf(6)
    });

    it('should sort entries in the crate', async () => {
        const crateService = {
            ...defaultCrateService, getRecords: () => createRecordResponse([
                createRecord('C', 'F', ''), createRecord('B', 'E', ''), createRecord('F', 'A', ''),
                createRecord('C', 'E', ''), createRecord('B', 'X'), createRecord('A', 'F', '')
            ])
        }
        await act(async () => await render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        expect(Array.from(document.body.querySelectorAll("[title='record']")).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')}))).to.be.deep.eql([
            {artist: 'A', title: 'F'}, {artist: 'B', title: 'E'}, {artist: 'B', title: 'X'}, {artist: 'C', title: 'E'}, {artist: 'C', title: 'F'}, {artist: 'F', title: 'A'}
        ])
    });

    it('should have a button labeled "import"', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByRole('button', {name: /import/i})).to.exist
    });

    it('should have an input field for the import', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByLabelText(/import/i)).to.exist
    });

    it('should not import anything if input field does not contain anything', async () => {
        let importCalled = false
        const crateService = {...defaultCrateService, importRecords: () => importCalled = true}
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>))
        userEvent.click(screen.getByRole('button', {name: /import/i}))
        expect(importCalled).to.be.false
    });

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
        await act(async () => {
            render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
            await userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","title":"Title","cover":"Cover"}]')
            userEvent.click(screen.getByRole('button', {name: /import/i}))
        })
        expect(screen.queryAllByTitle('record')).to.have.lengthOf(1)
    });

    it('should clear the input field after successful importing', async () => {
        await act(async () => {
            render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>)
            await userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","title":"Title","cover":"Cover"}]')
            userEvent.click(screen.getByRole('button', {name: /import/i}))
        })
        expect(screen.getByLabelText(/import/i).value).to.be.empty
    });

    it('should not clear the input field after unsuccessful importing', async () => {
        const crateService = {...defaultCrateService, importRecords: () => createStatusResponse(400)}
        await act(async () => {
            render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
            await userEvent.type(screen.getByLabelText(/import/i), '[{"artist":"Artist","tit')
            userEvent.click(screen.getByRole('button', {name: /import/i}))
        })
        expect(screen.getByLabelText(/import/i).value).to.be.eql('[{"artist":"Artist","tit')
    });

    it('should have a button to clear the crates', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByRole('button', {name: /clear/i})).to.exist
    });

    it('should tell the crate service to reset the crate when clear button is pressed', async () => {
        let resetCalled = false
        const crateService = {
            ...defaultCrateService, reset: () => {
                resetCalled = true
                return Promise.resolve()
            }
        }
        await act(async () => {
            render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
            userEvent.click(screen.getByRole('button', {name: /clear/i}))
        })
        expect(resetCalled).to.be.true
    });

    it('should have a reload button', async () => {
        await act(async () => render(<WithCrateService crateService={defaultCrateService}><CrateAdmin/></WithCrateService>))
        expect(screen.getByRole('button', {name: /reload/i})).to.exist
    });

    it('should reload the crate if the reload button is pressed', async () => {
        const tracks = [
            {artist: 'Artist 1', title: 'Title 1', cover: ''}, {artist: 'Artist 2', title: 'Title 2', cover: ''},
            {artist: 'Artist 3', title: 'Title 3', cover: ''}, {artist: 'Artist 4', title: 'Title 4', cover: ''}, {artist: 'Artist 5', title: 'Title 5', cover: ''},
        ]
        let firstAccess = true
        const crateService = {
            ...defaultCrateService,
            getRecords: () => {
                if (firstAccess) {
                    firstAccess = false
                    return createRecordResponse(tracks.slice(0, 2))
                }
                return createRecordResponse(tracks.slice(2))
            }
        }
        await act(async () => {
            render(<WithCrateService crateService={crateService}><CrateAdmin/></WithCrateService>)
            userEvent.click(screen.getByRole('button', {name: /reload/i}))
        })
        expect(Array.from(document.body.querySelectorAll("[title='record']")).map(element => ({artist: element.getAttribute('data-artist'), title: element.getAttribute('data-title')})))
            .to.be.deep.eql([{artist: 'Artist 3', title: 'Title 3'}, {artist: 'Artist 4', title: 'Title 4'}, {artist: 'Artist 5', title: 'Title 5'}])
    });

    it('should call given setters if a row is clicked', async () => {
        let calledSetters = {}
        const setArtist = artist => calledSetters = {...calledSetters, artist}
        const setTitle = title => calledSetters = {...calledSetters, title}
        const setCover = cover => calledSetters = {...calledSetters, cover}
        const crateService = {...defaultCrateService, getRecords: () => createRecordResponse([{id: "id1", artist: "Artist", title: "Title", cover: "Cover"}, {id: "id2", artist: "Artist 2", title: "Title 2", cover: "Cover 2"}])}
        await act(async () => render(<WithCrateService crateService={crateService}><CrateAdmin setArtist={setArtist} setTitle={setTitle} setCover={setCover}/></WithCrateService>))
        userEvent.dblClick(document.body.querySelector('[title="record"][data-id="id2"]'))
        expect(calledSetters).to.be.deep.eql({artist: 'Artist 2', title: 'Title 2', cover: 'Cover 2'})
    });

});
