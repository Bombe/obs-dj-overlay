import React, { useContext } from "react";
import OverlayContext from "../Overlay";
import "./TrackInfo.css";

const TrackInfo = () => {
    const overlayInfo = useContext(OverlayContext);

    return (overlayInfo.artist || overlayInfo.title) ? (
        <div className="TrackInfo">
            <div className="Artist">{overlayInfo.artist}</div>
            <div className="Title">{overlayInfo.title}</div>
        </div>
    ) : <></>;
}

export default TrackInfo;
