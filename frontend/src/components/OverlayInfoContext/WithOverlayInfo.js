import React, {createContext, useContext, useEffect, useState} from "react";

import defaultOverlayService from "../../services/overlay"
import {OverlayServiceContext} from "../OverlayServiceContext";

const OverlayContext = createContext(defaultOverlayService.defaultValue());

const WithOverlayInfo = (props) => {

    const overlayService = useContext(OverlayServiceContext)
    const overlayContext = useContext(OverlayContext)
    const [overlayInfo, setOverlayInfo] = useState(props.overlayInfo || overlayContext);

    useEffect(() => {
        if (props.overlayInfo) {
            return () => {}
        }

        const updateInfo = () => {
            overlayService.get().then(setOverlayInfo)
        };

        const timerHandler = setInterval(updateInfo, 1000);
        return () => clearTimeout(timerHandler);
    }, [overlayService, props.overlayInfo]);

    return (
        <OverlayContext.Provider value={overlayInfo}>
            {props.children}
        </OverlayContext.Provider>
    );
}

export {WithOverlayInfo as default, OverlayContext};
