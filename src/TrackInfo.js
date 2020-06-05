import React, { useContext } from "react";
import { OverlayContext } from "./Overlay";
import "./TrackInfo.css";

const TrackInfo = () => {
    const overlayInfo = useContext(OverlayContext);

    return (
        <div className="info">
            <OverlayContext.Consumer>{ (artist, title) => (
                <>
                    <div className="track-artist">{overlayInfo.artist}</div>
                    <div className="track-title">{overlayInfo.title}</div>
                </>
            )}</OverlayContext.Consumer>
        </div>
    );
}

export default TrackInfo;
