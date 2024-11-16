import { render, screen } from '@testing-library/react'
import moment from 'moment'

import { user } from '../../../utils/tests'

import { ExportDialog } from './ExportDialog'

jest.mock('copy-to-clipboard', () => jest.fn())

describe('The Export Dialog', () => {

    it('should contain an input field for the start time', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        await screen.findByRole('textbox', { name: /from/i })
    })

    it('should contain an input field for the end time', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        await screen.findByRole('textbox', { name: /to/i })
    })

    const setStartAndEndTime = (startTime = undefined, endTime = undefined) =>
        screen.findByRole('textbox', { name: /from/i })
            .then(startTimeElement => user.type(startTimeElement, startTime || '{Control>}a{/Control}{Delete}'))
            .then(() => screen.findByRole('textbox', { name: /to/i }))
            .then(endTimeElement => user.type(endTimeElement, endTime || '{Control>}a{/Control}{Delete}'))

    const findButton = buttonName =>
        screen.findByRole('button', { name: buttonName })

    const isButtonDisabledForStartAndEndTime = (buttonName, startTime = undefined, endTime = undefined) =>
        setStartAndEndTime(startTime, endTime)
            .then(() => findButton(buttonName))
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

    it('should have a checkbox below the time selection', async () => {
        render(<ExportDialog open={true} historyEntries={[]}/>)
        await screen.findByRole('checkbox', { name: /restrict/i })
    })

    const formatTime = time => moment(time).format('YYYY-MM-DD[T]HH:mm:ss')
    let copiedText
    const historyEntries = [
        { time: 0, artist: 'A', title: '1' }, { time: 30000, artist: 'B', title: '2' }, { time: 60000, artist: 'C', title: '3' }
    ]

    it('should copy the selected entries to the clipboard in html table format', async () => {
        render(<ExportDialog open={true} historyEntries={historyEntries} onCopy={text => copiedText = text}/>)
        await setStartAndEndTime(formatTime(15000), formatTime(90000))
        const htmlTable = await findButton(/html table/i)
        await user.click(htmlTable)
        expect(copiedText).toBe('<table><thead><th>Offset</th><th>Artist</th><th>Track</th></thead><tbody><tr><td>00:00:00</td><td>A</td><td>1</td></tr><tr><td>00:00:15</td><td>B</td><td>2</td></tr><tr><td>00:00:45</td><td>C</td><td>3</td></tr></tbody></table>')
    })

    it('should copy the selected entries to the clipboard in mixcloud format', async () => {
        render(<ExportDialog open={true} historyEntries={historyEntries} onCopy={text => copiedText = text}/>)
        await setStartAndEndTime(formatTime(15000), formatTime(90000))
        const htmlTable = await findButton(/mixcloud/i)
        await user.click(htmlTable)
        expect(copiedText).toBe('00:00:00 A - 1\n00:00:15 B - 2\n00:00:45 C - 3')
    })

    it('should copy the restricted entries to the clipboard in html table format when the checkbox is checked', async () => {
        render(<ExportDialog open={true} historyEntries={historyEntries} onCopy={text => copiedText = text}/>)
        await setStartAndEndTime(formatTime(15000), formatTime(90000))
        await user.click(screen.getByRole('checkbox', { name: /restrict/i }))
        const htmlTable = await findButton(/html table/i)
        await user.click(htmlTable)
        expect(copiedText).toBe('<table><thead><th>Offset</th><th>Artist</th><th>Track</th></thead><tbody><tr><td>00:00:00</td><td>B</td><td>2</td></tr><tr><td>00:00:45</td><td>C</td><td>3</td></tr></tbody></table>')
    })

    it('should copy the restricted entries to the clipboard in mixcloud format when the checkbox is checked', async () => {
        render(<ExportDialog open={true} historyEntries={historyEntries} onCopy={text => copiedText = text}/>)
        await setStartAndEndTime(formatTime(15000), formatTime(90000))
        await user.click(screen.getByRole('checkbox', { name: /restrict/i }))
        const htmlTable = await findButton(/mixcloud/i)
        await user.click(htmlTable)
        expect(copiedText).toBe('00:00:00 B - 2\n00:00:45 C - 3')
    })

})
