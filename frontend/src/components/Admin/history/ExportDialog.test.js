import { render, screen, waitFor } from '@testing-library/react'

import { ExportDialog } from './ExportDialog'
import { user } from '../../../utils/tests'

describe('The Export Dialog', () => {

    it('should contain an input field for the start time', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        await screen.findByRole('textbox', { name: /from/i })
    })

    it('should contain an input field for the end time', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        await screen.findByRole('textbox', { name: /to/i })
    })

    const isButtonDisabledForStartAndEndTime = (buttonName, startTime = undefined, endTime = undefined) =>
        screen.findByRole('textbox', { name: /from/i })
            .then(startTimeElement => user.type(startTimeElement, startTime || '{Control>}a{/Control}{Delete}'))
            .then(() => screen.findByRole('textbox', { name: /to/i }))
            .then(endTimeElement => user.type(endTimeElement, endTime || '{Control>}a{/Control}{Delete}'))
            .then(() => screen.findByRole('button', { name: buttonName }))
            .then(button => button.disabled)

    it('should disable the html table button if neither start nor end time are set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/html table/i)).toBe(true)
    })

    it('should disable the html table button if start time is not set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/html table/i, undefined, '2024-11-16T13:37')).toBe(true)
    })

    it('should disable the html table button if end time is not set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/html table/i, '2024-11-16T13:37')).toBe(true)
    })

    it('should enable the html table button if both start and end time are set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/html table/i, '2024-11-16T13:37', '2024-11-17T13:37')).toBe(false)
    })

    it('should disable the mixcloud button if neither start nor end time are set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/mixcloud/i)).toBe(true)
    })

    it('should disable the mixcloud button if start time is not set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/mixcloud/i, undefined, '2024-11-16T13:37')).toBe(true)
    })

    it('should disable the mixcloud button if end time is not set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/mixcloud/i, '2024-11-16T13:37')).toBe(true)
    })

    it('should enable the mixcloud button if both start and end time are set', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        expect(await isButtonDisabledForStartAndEndTime(/mixcloud/i, '2024-11-16T13:37', '2024-11-17T13:37')).toBe(false)
    })

})
