import React from 'react'
import {act, render, screen, within} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {expect} from 'chai'

import {TrackSearch} from './TrackSearch'
import WithSearchService from '../../../contexts/searchService'

const track1 = {artists: ['Artist A', 'A2'], title: 'Title A', mix: 'A', cover: 'img:a'}
const track2 = {artists: ['Artist B', 'B2'], title: 'Title B', mix: 'B', cover: 'img:b'}

describe('The Track Search', () => {

    it('should have an input field for the search', () => {
        render(<TrackSearch/>)
        expect(screen.getByLabelText(/terms/i)).to.exist
    })

    it('should have a button for the search', () => {
        render(<TrackSearch/>)
        expect(screen.getByRole('button', {name: /search/i})).to.exist
    })

    it('should call the search service with the words given in the input field', async () => {
        let providedTerms
        const searchService = {
            search: terms => {
                providedTerms = terms
                return Promise.resolve([])
            }
        }
        await act(async () => {
            render(<WithSearchService searchService={searchService}><TrackSearch/></WithSearchService>)
            await userEvent.type(screen.getByLabelText(/terms/i), "Word.1 WORD 2, word")
            userEvent.click(screen.getByRole('button', {name: /search/i}))
        })
        expect(providedTerms).to.eql(['word.1', 'word', '2', 'word'])
    })

    it('should clear the list if the search service does not return results', () => {
        const searchService = {search: terms => Promise.resolve([])}
        render(<WithSearchService coverSearchService={searchService}><TrackSearch/></WithSearchService>)
        expect(screen.queryAllByTestId('row')).to.be.empty
    })

    it('should show results with merged artists and titles', async () => {
        const searchService = {search: terms => Promise.resolve([track1, track2])}
        await act(async () => {
            render(<WithSearchService searchService={searchService}><TrackSearch/></WithSearchService>)
            userEvent.click(screen.getByRole('button', {name: /search/i}))
        })
        const rows = screen.queryAllByTestId('row');
        expect(rows).to.be.of.length(2)
        expect(within(rows[0]).getByTitle('artist').textContent).to.be.equal('Artist A, A2')
        expect(within(rows[0]).getByTitle('title').textContent).to.be.equal('Title A (A)')
        expect(within(rows[1]).getByTitle('artist').textContent).to.be.equal('Artist B, B2')
        expect(within(rows[1]).getByTitle('title').textContent).to.be.equal('Title B (B)')
    })

    it('should contain a button in each row of the results', async () => {
        const searchService = {search: terms => Promise.resolve([track1, track2])}
        await act(async () => {
            render(<WithSearchService searchService={searchService}><TrackSearch/></WithSearchService>)
            userEvent.click(screen.getByRole('button', {name: /search/i}))
        })
        screen.queryAllByTestId('row').forEach(row => {
            expect(within(row).getByRole('button')).to.exist
        })
    })

    it('should call the given handlers when one of the buttons is clicked', async () => {
        const searchService = {search: terms => Promise.resolve([track1, track2])}
        let calledSetters = {}
        const setArtist = artist => calledSetters = {...calledSetters, artist}
        const setTitle = title => calledSetters = {...calledSetters, title}
        const setCover = cover => calledSetters = {...calledSetters, cover}
        await act(async () => {
            render(<WithSearchService searchService={searchService}><TrackSearch setArtist={setArtist} setTitle={setTitle} setCover={setCover} scrollToTrack={() => {}}/></WithSearchService>)
            userEvent.click(screen.getByRole('button', {name: /search/i}))
        })
        const button = within(screen.queryAllByTestId('row').at(1)).getByRole('button')
        userEvent.click(button)
        expect(calledSetters).to.deep.eql({artist: 'Artist B, B2', title: 'Title B (B)', cover: 'img:b'})
    })

    it('should clear the input field when one of the buttons is clicked', async () => {
        const searchService = {search: terms => Promise.resolve([track1, track2])}
        await act(async () => {
            render(<WithSearchService searchService={searchService}><TrackSearch setArtist={() => {}} setTitle={() => {}} setCover={() => {}} scrollToTrack={() => {}}/></WithSearchService>)
            await userEvent.type(screen.getByLabelText(/terms/i), 'some search terms')
            userEvent.click(screen.getByRole('button', {name: /search/i}))
        })
        const button = within(screen.queryAllByTestId('row').at(1)).getByRole('button')
        userEvent.click(button)
        expect(screen.getByLabelText(/terms/i).value).to.be.empty
    })

    it('should call the scroll-to-track function when one of the buttons is clicked', async () => {
        let scrollToTrackCalled = false
        const searchService = {search: terms => Promise.resolve([track1, track2])}
        await act(async () => {
            render(<WithSearchService searchService={searchService}><TrackSearch setArtist={() => {}} setTitle={() => {}} setCover={() => {}} scrollToTrack={() => scrollToTrackCalled = true}/></WithSearchService>)
            await userEvent.type(screen.getByLabelText(/terms/i), 'some search terms')
            userEvent.click(screen.getByRole('button', {name: /search/i}))
        })
        const button = within(screen.queryAllByTestId('row').at(1)).getByRole('button')
        userEvent.click(button)
        expect(scrollToTrackCalled).to.be.true
    })

})
