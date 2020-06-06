import React, { createContext, useEffect, useState } from "react";

const OverlayContext = createContext();

const Overlay = (props) => {

    const [ overlayInfo, setOverlayInfo ] = useState({
        artist: "",
        title: "",
        nextShow: "",
        twitchUserName: ""
    });

    const updateInfo = () => {
        fetch("./overlay.json")
            .then(response => response.json())
            .then(json => {
                setOverlayInfo({ artist: json.artist, title: json.title, nextShow: json.nextShow, twitchUserName: json.twitchUserName });
            })
            .catch(() => {});
    };

    useEffect(() => {
        const timerHandler = setInterval(updateInfo, 1000);
        return () => clearTimeout(timerHandler);
    }, [overlayInfo.artist, overlayInfo.title, overlayInfo.nextShow, overlayInfo.twitchUserName]);

    return (
        <OverlayContext.Provider value={overlayInfo}>
            { props.children }
        </OverlayContext.Provider>
    );
}

export default Overlay;
export { OverlayContext };
