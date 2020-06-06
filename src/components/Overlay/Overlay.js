import React, {createContext, useContext, useEffect, useState} from "react";

const OverlayContext = createContext({
    artist: "",
    title: "",
    nextShow: "",
    twitchUserName: ""
});

const Overlay = (props) => {

    const [overlayInfo, setOverlayInfo] = useState(useContext(OverlayContext));

    const updateInfo = () => {
        fetch("./overlay.json")
            .then(response => response.json())
            .then(json => {
                setOverlayInfo({ artist: json.artist, title: json.title, nextShow: json.nextShow, twitchUserName: json.twitchUserName });
            })
            .catch(() => {});
    };

    useEffect(() => {
        updateInfo();
        const timerHandler = setInterval(updateInfo, 1000);
        return () => clearTimeout(timerHandler);
    }, [overlayInfo.artist, overlayInfo.title, overlayInfo.nextShow, overlayInfo.twitchUserName]);

    return (
        <OverlayContext.Provider value={overlayInfo}>
            { props.children }
        </OverlayContext.Provider>
    );
}

export {Overlay as default, OverlayContext};
