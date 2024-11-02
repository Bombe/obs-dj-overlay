import { render, screen, waitFor } from '@testing-library/react'
import {expect} from 'chai'

import {MessageAdmin} from './MessageAdmin'
import WithOverlayService from '../../../contexts/overlayService'
import {doNothing, user} from '../../../utils/tests'

describe('The Message Section', () => {

    const defaultOverlayService = {
        get: () => Promise.resolve({message: ''}),
        setMessage: doNothing
    }

    it('should have an input field', async () => {
        render(<WithOverlayService overlayService={defaultOverlayService}><MessageAdmin/></WithOverlayService>)
        await waitFor(() => expect(screen.getByLabelText(/message/i)).to.exist)
    })

    it('should get initial message from overlay service context', async () => {
        const overlayService = {...defaultOverlayService, get: () => Promise.resolve({message: 'Test Message'})}
        render(<WithOverlayService overlayService={overlayService}><MessageAdmin/></WithOverlayService>)
        await waitFor(() => expect(screen.getByLabelText(/message/i).value).to.eql('Test Message'))
    })

    it('should have a button to send message', async () => {
        render(<WithOverlayService overlayService={defaultOverlayService}><MessageAdmin/></WithOverlayService>)
        await waitFor(() => expect(screen.getByRole('button', {name: /update/i})).to.exist)
    })

    it('should send message to overlay service when button is pressed', async () => {
        let sentMessage
        const overlayService = {...defaultOverlayService, setMessage: message => sentMessage = message}
        render(<WithOverlayService overlayService={overlayService}><MessageAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/message/i), 'test message')
        await user.click(screen.getByRole('button', {name: /update/i}))
        expect(sentMessage).to.eql('test message')
    })

    it('should send message to overlay service when ctrl-enter is pressed', async () => {
        let sentMessage
        const overlayService = {...defaultOverlayService, setMessage: message => sentMessage = message}
        render(<WithOverlayService overlayService={overlayService}><MessageAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/message/i), 'test message{Control>}{Enter}{/ControlLeft}')
        expect(sentMessage).to.eql('test message')
    })

    it('should have a button to clear the message', async () => {
        render(<WithOverlayService overlayService={defaultOverlayService}><MessageAdmin/></WithOverlayService>)
        await waitFor(() => expect(screen.getByRole('button', {name: /clear/i})).to.exist)
    })

    it('should clear the input field when clear button is pressed', async () => {
        render(<WithOverlayService overlayService={defaultOverlayService}><MessageAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/message/i), 'test message')
        await user.click(screen.getByRole('button', {name: /clear/i}))
        expect(screen.getByLabelText(/message/i).value).to.eql('')
    })

    it('should have a button to restore the message', async () => {
        render(<WithOverlayService overlayService={defaultOverlayService}><MessageAdmin/></WithOverlayService>)
        await waitFor(() => expect(screen.getByRole('button', {name: /restore/i})).to.exist)
    })

    it('should restore the message when the restore button is pressed', async () => {
        const overlayService = {...defaultOverlayService, get: () => Promise.resolve({message: 'Initial Message'})}
        render(<WithOverlayService overlayService={overlayService}><MessageAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/message/i), 'test message')
        await user.click(screen.getByRole('button', {name: /restore/i}))
        expect(screen.getByLabelText(/message/i).value).to.eql('Initial Message')
    })

})
