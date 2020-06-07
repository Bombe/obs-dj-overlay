import React, {createContext, useContext, useEffect, useState} from "react";

const OverlayContext = createContext({
    track: {
        artist: "",
        title: ""
    },
    show: {
        "title": "",
        "subtitle": ""
    },
    nextShow: "",
    twitchUserName: ""
});

const Overlay = (props) => {

    const [overlayInfo, setOverlayInfo] = useState(useContext(OverlayContext));

    const updateInfo = () => {
        fetch("./overlay.json")
            .then(response => response.json())
            .then(json => {
                setOverlayInfo({
                    track: {
                        artist: json.track.artist,
                        title: json.track.title,
                    },
                    show: {
                        title: json.show.title,
                        subtitle: json.show.subtitle
                    },
                    nextShow: json.nextShow,
                    twitchUserName: json.twitchUserName
                });
            })
            .catch(() => {
            });
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
