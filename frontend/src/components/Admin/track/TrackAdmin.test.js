import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import React from "react"
import {expect} from "chai"

import WithOverlayService from "../../OverlayServiceContext"
import TrackAdmin from "./"

describe('The Track Administration', () => {

    const overlayService = {
        get: () => ({ then: () => {} }),
    }

    it('has a text field labeled "number of the track"', () => {
        render(<WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService>)
        expect(screen.getByLabelText(/the number of the track/i)).to.exist
    })

    it('should have a field labeled "cover"', () => {
        render(<WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService>)
        expect(screen.getByLabelText(/cover/i)).to.exist
    });

    it('should send all entered data to overlay service', () => {
        let capturedValues
        const capturingOverlayService = {
            ...overlayService,
            setTrackInfo: (number, artist, title, cover) => {
                capturedValues = {number, artist, title, cover}
            }
        }
        render(<WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService>)
        userEvent.type(screen.getByLabelText(/number/i), '12')
        userEvent.type(screen.getByLabelText(/artist/i), 'Artist')
        userEvent.type(screen.getByLabelText(/title/i), 'Title')
        userEvent.type(screen.getByLabelText(/cover/i), 'Cover')
        userEvent.click(screen.getByRole('button', {name: /update/i}))
        expect(capturedValues).to.deep.eql({number: 12, artist: 'Artist', title: 'Title', cover: 'Cover'})
    });

    it('should have a button labeled “reset last track”', () => {
        render(<WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService>)
        expect(screen.getByText(/reset last track/i)).to.exist
    });

    it('should reset the last track on the overlay service', () => {
        let lastTrackReset = false
        const resettingOverlayService = { ...overlayService,
            resetLastTrack: () => lastTrackReset = true
        }
        render(<WithOverlayService overlayService={resettingOverlayService}><TrackAdmin/></WithOverlayService>)
        screen.getByText(/reset last track/i).click()
        expect(lastTrackReset).to.be.true
    });

    it('should have a button labeled “amend”', () => {
        render(<WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService>)
        expect(screen.getByText(/amend/i)).to.exist
    });

    it('should send all entered data to overlay service when amending', () => {
        let capturedValues
        const capturingOverlayService = {
            ...overlayService,
            amendCurrentTrack: (number, artist, title, cover) => {
                capturedValues = {number, artist, title, cover}
            }
        }
        render(<WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService>)
        userEvent.type(screen.getByLabelText(/number/i), '12')
        userEvent.type(screen.getByLabelText(/artist/i), 'Artist')
        userEvent.type(screen.getByLabelText(/title/i), 'Title')
        userEvent.type(screen.getByLabelText(/cover/i), 'Cover')
        userEvent.click(screen.getByRole('button', {name: /amend/i}))
        expect(capturedValues).to.deep.eql({number: 12, artist: 'Artist', title: 'Title', cover: 'Cover'})
    });

})
