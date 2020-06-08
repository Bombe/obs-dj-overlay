import React, {createContext, useContext, useEffect, useState} from "react";

import overlayService from "../../services/overlay"

const OverlayContext = createContext(overlayService.defaultValue());

const Overlay = (props) => {

    const [overlayInfo, setOverlayInfo] = useState(useContext(OverlayContext));

    const updateInfo = () => {
        overlayService.get()
            .then(overlayInfo => setOverlayInfo(overlayInfo))
    };

    useEffect(() => {
        const timerHandler = setInterval(updateInfo, 1000);
        updateInfo();
        return () => clearTimeout(timerHandler);
    }, []);

    return (
        <OverlayContext.Provider value={overlayInfo}>
            {props.children}
        </OverlayContext.Provider>
    );
}

export {Overlay as default, OverlayContext};
