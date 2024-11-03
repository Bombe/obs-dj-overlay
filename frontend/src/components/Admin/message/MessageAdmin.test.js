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

    it('should have a reset button that clears the message', async () => {
        let currentMessage = "initial message"
        const overlayService = { ...defaultOverlayService, get: () => Promise.resolve({ message: currentMessage }), setMessage: message => currentMessage = message }
        render(<WithOverlayService overlayService={overlayService}><MessageAdmin/></WithOverlayService>)
        await user.click(screen.getByRole('button', { name: /reset/i }))
        expect(currentMessage).to.eql('')
    })

    it('should have a reload button that loads the message from the server', async () => {
        let currentMessage = 'Initial Message'
        const overlayService = { ...defaultOverlayService, get: () => Promise.resolve({ message: currentMessage }), setMessage: message => currentMessage = message }
        render(<WithOverlayService overlayService={overlayService}><MessageAdmin/></WithOverlayService>)
        await waitFor(() => expect(screen.getByLabelText(/message/i).value).to.be.eql('Initial Message'))
        currentMessage = 'New Message'
        await user.click(screen.getByRole('button', { name: /reload/i }))
        expect(screen.getByLabelText(/message/i).value).to.be.eql('New Message')
    })

})
