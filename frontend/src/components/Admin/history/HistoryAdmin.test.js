import { render, screen, waitFor } from '@testing-library/react'
import {expect} from 'chai'

import {user} from '../../../utils/tests'
import {HistoryAdmin} from './HistoryAdmin'
import WithHistoryService from '../../../contexts/historyService'

describe('The History Admin', () => {

    const emptyHistoryService = {
        entries: () => Promise.resolve({json: () => []}),
        reset: () => {}
    }

    it('should have an export button', async () => {
        render(<WithHistoryService historyService={emptyHistoryService}><HistoryAdmin/></WithHistoryService>)
        await waitFor(() => expect(screen.getByRole('button', {name: /export/i})).to.exist)
    })

    it('should have a reload button', async () => {
        render(<WithHistoryService historyService={emptyHistoryService}><HistoryAdmin/></WithHistoryService>)
        await waitFor(() => expect(screen.getByRole('button', {name: /reload/i})).to.exist)
    })

    it('should reload the history entries when the reload button is pressed', async () => {
        let results = []
        const testHistoryService = {...emptyHistoryService, entries: () => Promise.resolve({json: () => results})}
        render(<WithHistoryService historyService={testHistoryService}><HistoryAdmin/></WithHistoryService>)
        await waitFor(() => expect(document.querySelectorAll('table tbody tr')).to.have.lengthOf(0))
        results = [{time: 0, artist: 'A', title: '1'}, {time: 1, artist: 'B', title: '2'}]
        await user.click(screen.getByRole('button', {name: /reload/i}))
        expect(document.querySelectorAll('table tbody tr')).to.have.lengthOf(2)
    })

    it('should have a reset button', async () => {
        render(<WithHistoryService historyService={emptyHistoryService}><HistoryAdmin/></WithHistoryService>)
        await waitFor(() => expect(screen.getByRole('button', {name: /reset/i})).to.exist)
    })

    it('should reset the entries when the reset button is pressed', async () => {
        let resetCalled = false
        const testHistoryService = {...emptyHistoryService, reset: () => resetCalled = true}
        render(<WithHistoryService historyService={testHistoryService}><HistoryAdmin/></WithHistoryService>)
        await user.click(screen.getByRole('button', { name: /reset/i }))
        expect(resetCalled).to.be.true
    })

    it('should use the provided history service', async () => {
        const testHistoryService = {...emptyHistoryService, entries: () => Promise.resolve({json: () => ([{time: 0, artist: 'A', title: '1'}, {time: 1, artist: 'B', title: '2'}, {time: 2, artist: 'C', title: '3'}])})}
        render(<WithHistoryService historyService={testHistoryService}><HistoryAdmin/></WithHistoryService>)
        await waitFor(() => expect(document.querySelectorAll('table tbody tr')).to.have.lengthOf(3))
    })

})
