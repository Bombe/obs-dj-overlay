import React, {createContext, useContext, useEffect, useState} from "react";

import defaultOverlayService from "../../services/overlay"
import {OverlayServiceContext} from "../OverlayServiceContext";

const OverlayContext = createContext(defaultOverlayService.defaultValue());

const WithOverlayInfo = (props) => {

    const overlayService = useContext(OverlayServiceContext)
    const [overlayInfo, setOverlayInfo] = useState(useContext(OverlayContext));

    useEffect(() => {
        const updateInfo = () => {
            overlayService.get().then(setOverlayInfo)
        };

        const timerHandler = setInterval(updateInfo, 1000);
        return () => clearTimeout(timerHandler);
    }, [overlayService]);

    return (
        <OverlayContext.Provider value={overlayInfo}>
            {props.children}
        </OverlayContext.Provider>
    );
}

export {WithOverlayInfo as default, OverlayContext};
