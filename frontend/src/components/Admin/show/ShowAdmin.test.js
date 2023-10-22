import {act, render, screen} from '@testing-library/react'
import {expect} from 'chai'

import {doNothing, user} from '../../../utils/tests'
import WithOverlayService from '../../../contexts/overlayService'
import {ShowAdmin} from './ShowAdmin'

describe('The Show Admin', () => {

    const defaultOverlayService = {
        get: () => Promise.resolve({show: {title: '', subtitle: '', nextShow: ''}}),
        setShowInfo: doNothing
    }

    it('should have an input field for the title', async () => {
        await act(async () => render(<WithOverlayService overlayService={defaultOverlayService}><ShowAdmin/></WithOverlayService>))
        expect(screen.getByLabelText(/\btitle/i)).to.exist
    })

    it('should have an input field for the subtitle', async () => {
        await act(async () => render(<WithOverlayService overlayService={defaultOverlayService}><ShowAdmin/></WithOverlayService>))
        expect(screen.getByLabelText(/subtitle/i)).to.exist
    })

    it('should have an input field for an announcement', async () => {
        await act(async () => render(<WithOverlayService overlayService={defaultOverlayService}><ShowAdmin/></WithOverlayService>))
        expect(screen.getByLabelText(/announcement/i)).to.exist
    })

    it('should have an update button', async () => {
        await act(async () => render(<WithOverlayService overlayService={defaultOverlayService}><ShowAdmin/></WithOverlayService>))
        expect(screen.getByRole('button', {name: /update/i})).to.exist
    })

    it('should have a restore button', async () => {
        await act(async () => render(<WithOverlayService overlayService={defaultOverlayService}><ShowAdmin/></WithOverlayService>))
        expect(screen.getByRole('button', {name: /restore/i})).to.exist
    })

    it('should show data from the overlay service', async () => {
        const overlayService = {...defaultOverlayService, get: () => Promise.resolve({show: {title: 'Title', subtitle: 'Subtitle', nextShow: 'Next Show'}})}
        await act(async () => render(<WithOverlayService overlayService={overlayService}><ShowAdmin/></WithOverlayService>))
        expect(screen.getByLabelText(/\btitle/i).value).to.eql('Title')
        expect(screen.getByLabelText(/subtitle/i).value).to.eql('Subtitle')
        expect(screen.getByLabelText(/announcement/i).value).to.eql('Next Show')
    })

    it('should send the data to the overlay service when the update button is pressed', async () => {
        let sentData
        const overlayService = {...defaultOverlayService, setShowInfo: (title, subtitle, nextShow) => sentData = {title, subtitle, nextShow}}
        render(<WithOverlayService overlayService={overlayService}><ShowAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/\btitle/i), 'title')
        await user.type(screen.getByLabelText(/subtitle/i), 'subtitle')
        await user.type(screen.getByLabelText(/announcement/i), 'next show')
        await user.click(screen.getByRole('button', {name: /update/i}))
        expect(sentData).to.be.eql({title: 'title', subtitle: 'subtitle', nextShow: 'next show'})
    })

    it('should restore the data when the restore button is pressed', async () => {
        const overlayService = {...defaultOverlayService, get: () => Promise.resolve({show: {title: 'Title', subtitle: 'Subtitle', nextShow: 'Next Show'}})}
        render(<WithOverlayService overlayService={overlayService}><ShowAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/\btitle/i), 'title')
        await user.type(screen.getByLabelText(/subtitle/i), 'subtitle')
        await user.type(screen.getByLabelText(/announcement/i), 'next show')
        await user.click(screen.getByRole('button', {name: /restore/i}))
        expect(screen.getByLabelText(/\btitle/i).value).to.eql('Title')
        expect(screen.getByLabelText(/subtitle/i).value).to.eql('Subtitle')
        expect(screen.getByLabelText(/announcement/i).value).to.eql('Next Show')
    })

    it('should focus the subtitle input field when enter is pressed in the title input field', async () => {
        render(<WithOverlayService overlayService={defaultOverlayService}><ShowAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/\btitle/i), 'title{Enter}')
        expect(screen.getByLabelText(/subtitle/)).to.eql(document.activeElement)
    })

    it('should focus the announcement input field when enter is pressed in the subtitle input field', async () => {
        render(<WithOverlayService overlayService={defaultOverlayService}><ShowAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/subtitle/i), 'subtitle{Enter}')
        expect(screen.getByLabelText(/announcement/i)).to.eql(document.activeElement)
    })

    it('should send show info to the overlay service when enter is pressed in the announcement input field', async () => {
        let sentData
        const overlayService = {...defaultOverlayService, setShowInfo: (title, subtitle, nextShow) => sentData = {title, subtitle, nextShow}}
        render(<WithOverlayService overlayService={overlayService}><ShowAdmin/></WithOverlayService>)
        await user.type(screen.getByLabelText(/announcement/i), 'next show{Enter}')
        expect(sentData).to.be.eql({title: '', subtitle: '', nextShow: 'next show'})
    })

})
