import React, {useContext} from "react"
import {OverlayInfoContext} from "../../context/overlayInfo"
import "./TrackInfo.css"

const TrackInfo = () => {
    const overlayInfo = useContext(OverlayInfoContext)

    return (overlayInfo.track && (overlayInfo.track.artist || overlayInfo.track.title)) ? (
        <div className="TrackInfo">
            {overlayInfo.track.cover ?
                <div className="Cover"><img alt="" src={overlayInfo.track.cover} title="cover-image"/></div>
                : <></>
            }
            {overlayInfo.track.number ?
                <div className="Number" title="track-number">{overlayInfo.track.number}</div>
                : <></>
            }
            <div className="Artist" title="artist">{overlayInfo.track.artist}</div>
            <div className="Title" title="title">{overlayInfo.track.title}</div>
            {overlayInfo.lastTrack.artist !== "" && overlayInfo.lastTrack.title !== "" ?
                <div className="LastTrack">
                    <div className="LastArtist" title="last-artist">{overlayInfo.lastTrack.artist}</div>
                    <div className="LastTitle" title="last-title">{overlayInfo.lastTrack.title}</div>
                </div>
                : <></>
            }
        </div>
    ) : <></>
}

export default TrackInfo
