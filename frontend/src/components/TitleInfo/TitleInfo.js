import React, {useContext} from "react";

import {OverlayContext} from "../OverlayInfoContext";

import "./TitleInfo.css";

const TitleInfo = () => {

    const overlayInfo = useContext(OverlayContext);

    return (overlayInfo.show && (overlayInfo.show.title || overlayInfo.show.subtitle)) ? (
        <div className="TitleInfo">
            <div className="Title">{overlayInfo.show.title}</div>
            <div className="Subtitle">{overlayInfo.show.subtitle}</div>
        </div>
    ) : <></>;

}

export {TitleInfo};
