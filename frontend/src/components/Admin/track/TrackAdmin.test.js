import {act, render, screen} from "@testing-library/react"
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

    it('should have a button labeled “reset”', () => {
        render(<WithOverlayService overlayService={overlayService}><TrackAdmin/></WithOverlayService>)
        expect(screen.getByText(/reset/i)).to.exist
    });

    it('should reset the last track when reset button is pressed', () => {
        let resetLastTrackCalled = false
        const capturingOverlayService = {
            ...overlayService, resetLastTrack: () => resetLastTrackCalled = true, setTrackInfo: () => {
            }
        }
        render(<WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService>)
        userEvent.click(screen.getByText(/reset/i))
        expect(resetLastTrackCalled).to.be.true
    });

    it('should clear the current track when reset button is pressed', () => {
        let capturedSetter = {}
        const capturingOverlayService = {
            ...overlayService, resetLastTrack: () => {
            }, setTrackInfo: (number, artist, title, cover) => capturedSetter = {number, artist, title, cover}
        }
        render(<WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService>)
        userEvent.click(screen.getByText(/reset/i))
        expect(capturedSetter).to.deep.eql({number: 0, artist: '', title: '', cover: ''})
    });

    it('should clear the input fields when reset button is pressed', async () => {
        const capturingOverlayService = {
            ...overlayService,
            get: () => Promise.resolve({track: {number: 0, artist: '', title: '', cover: ''}}),
            resetLastTrack: () => {},
            setTrackInfo: () => {}
        }
        await act(async () => {
            render(<WithOverlayService overlayService={capturingOverlayService}><TrackAdmin/></WithOverlayService>)
            await userEvent.type(screen.getByLabelText(/number/i), "12")
            await userEvent.type(screen.getByLabelText(/artist/i), "artist")
            await userEvent.type(screen.getByLabelText(/title/i), "title")
            await userEvent.type(screen.getByLabelText(/cover/i), "cover")
            userEvent.click(screen.getByText(/reset/i))
        })
        expect(screen.getByLabelText(/number/i).value).to.eql('0')
        expect(screen.getByLabelText(/artist/i).value).to.eql('')
        expect(screen.getByLabelText(/title/i).value).to.eql('')
        expect(screen.getByLabelText(/cover/i).value).to.eql('')
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
