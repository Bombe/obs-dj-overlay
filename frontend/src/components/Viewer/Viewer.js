import React from "react"

import TrackInfo from "../TrackInfo"
import {Overlay} from "../Overlay"
import NextShow from "../NextShow"
import TwitchInfo from "../TwitchInfo"
import Clock from "../Clock"
import TitleInfo from "../TitleInfo"
import Message from "../Message"

import "./Viewer.css"

const Viewer = () => {
    return (
        <div className="Background">
            <div className="Viewer ">
                <Overlay>
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
                </Overlay>
            </div>
        </div>
    )
}

export {Viewer}