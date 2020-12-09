import React, {useContext} from "react"
import OverlayContext from "../Overlay"
import "./TrackInfo.css"

const TrackInfo = () => {
    const overlayInfo = useContext(OverlayContext)

    return (overlayInfo.track && (overlayInfo.track.artist || overlayInfo.track.title)) ? (
        <div className="TrackInfo">
            {overlayInfo.track.number ?
                <div className="Number">{overlayInfo.track.number}</div>
                : <></>
            }
            <div className="Artist">{overlayInfo.track.artist}</div>
            <div className="Title">{overlayInfo.track.title}</div>
            {overlayInfo.lastTrack.artist !== "" && overlayInfo.lastTrack.title !== "" ?
                <div className="LastTrack">
                    <div className="LastArtist">{overlayInfo.lastTrack.artist}</div>
                    <div className="LastTitle">{overlayInfo.lastTrack.title}</div>
                </div>
                : <></>
            }
        </div>
    ) : <></>
}

export default TrackInfo
