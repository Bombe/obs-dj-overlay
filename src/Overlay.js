import React, { createContext, useEffect, useState } from "react";

const OverlayContext = createContext();

const Overlay = (props) => {

    const [ timer, setTimer ] = useState({});
    const [ overlayInfo, setOverlayInfo ] = useState({
        artist: "Artist",
        title: "Title",
        nextShow: "",
    });

    const updateInfo = () => {
        fetch("./overlay.json")
            .then(response => response.json())
            .then(json => {
                setOverlayInfo({ artist: json.artist, title: json.title, nextShow: json.nextShow });
            })
            .then(() => {
                setTimer(setTimeout(updateInfo, 1000));
            })
    };

    useEffect(() => {
        updateInfo();
        return () => clearTimeout(timer);
    }, [overlayInfo.artist, overlayInfo.title, overlayInfo.nextShow]);

    return (
        <OverlayContext.Provider value={overlayInfo}>
            { props.children }
        </OverlayContext.Provider>
    );
}

export default Overlay;
export { OverlayContext };
