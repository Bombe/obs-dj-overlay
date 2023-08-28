import {render, screen} from "@testing-library/react"
import React from "react"
import {expect} from "chai"

import {WithOverlayService} from "../../OverlayServiceContext"
import TrackAdmin from "./"

describe('The Track Administration', () => {

    it('has a text field labeled "number of the track"', () => {
        render(<WithOverlayService><TrackAdmin/></WithOverlayService>)
        expect(screen.getByLabelText(/the number of the track/i)).to.exist
    })

})
