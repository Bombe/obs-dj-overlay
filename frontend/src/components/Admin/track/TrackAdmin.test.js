import {render, screen} from "@testing-library/react"
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

})
