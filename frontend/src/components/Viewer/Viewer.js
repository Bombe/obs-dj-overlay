import React from "react"

import TrackInfo from "../TrackInfo"
import WithOverlayInfo from "../../contexts/overlayInfo"
import NextShow from "../NextShow"
import TwitchInfo from "../TwitchInfo"
import Clock from "../Clock"
import TitleInfo from "../TitleInfo"
import Message from "../Message"

import "./Viewer.css"
import WithOverlayService from "../../contexts/overlayService";

const Viewer = () => {
    return (
        <div className="Background">
            <div className="Viewer ">
                <WithOverlayService>
                    <WithOverlayInfo>
                        <Message/>
                        <div className="Center">
                            <div className="Left">
                                <TitleInfo/>
                            </div>
                            <div className="Expand">
                            </div>
                            <div className="Right">
                                <Clock/>
                                <TwitchInfo/>
                            </div>
                        </div>
                        <div className="Bottom">
                            <TrackInfo/>
                            <NextShow/>
                        </div>
                    </WithOverlayInfo>
                </WithOverlayService>
            </div>
        </div>
    )
}

export {Viewer}
