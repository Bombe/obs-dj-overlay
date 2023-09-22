import React, {createContext, useContext, useEffect, useState} from 'react'

import defaultOverlayService from '../../services/overlay'
import {OverlayServiceContext} from '../../components/OverlayServiceContext'

const OverlayInfoContext = createContext(defaultOverlayService.defaultValue())

const WithOverlayInfo = (props) => {

    const overlayService = useContext(OverlayServiceContext)
    const [overlayInfo, setOverlayInfo] = useState(props.overlayInfo || overlayService.defaultValue())

    useEffect(() => {
        if (props.overlayInfo) {
            return
        }

        const updateInfo = () => {
            overlayService.get().then(setOverlayInfo)
        };

        updateInfo()

        const timerHandler = setInterval(updateInfo, 1000)
        return () => clearTimeout(timerHandler)
    }, [overlayService, props.overlayInfo])

    return (
        <OverlayInfoContext.Provider value={overlayInfo}>
            {props.children}
        </OverlayInfoContext.Provider>
    );
}

export {WithOverlayInfo, OverlayInfoContext};
