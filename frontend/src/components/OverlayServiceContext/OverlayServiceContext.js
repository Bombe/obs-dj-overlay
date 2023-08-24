import React, {createContext} from "react"

import OverlayService from "../../services/overlay"

const OverlayServiceContext = createContext(null)

const WithOverlayService = (props) => {
    const overlayService = props.overlayService || OverlayService

    return (
        <OverlayServiceContext.Provider value={overlayService}>
            {props.children}
        </OverlayServiceContext.Provider>
    )
}

module.exports = {OverlayServiceContext, WithOverlayService}
