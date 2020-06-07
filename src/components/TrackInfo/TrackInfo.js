import React, { useContext } from "react";
import OverlayContext from "../Overlay";
import "./TrackInfo.css";

const TrackInfo = () => {
    const overlayInfo = useContext(OverlayContext);

    return (overlayInfo.track && (overlayInfo.track.artist || overlayInfo.track.title)) ? (
        <div className="TrackInfo">
            <div className="Artist">{overlayInfo.track.artist}</div>
            <div className="Title">{overlayInfo.track.title}</div>
        </div>
    ) : <></>;
}

export default TrackInfo;
