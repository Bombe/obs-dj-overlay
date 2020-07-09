import React, {useContext, useEffect, useState} from "react";
import TwitchClient from 'twitch';
import config from "../../utils/config";
import {TwitchGlitchPurple} from "../Logo/";
import OverlayContext from "../Overlay";
import "./TwitchInfo.css";

const hasTwitchConfig = (config && config.twitch && config.twitch.clientId && config.twitch.clientSecret);
const twitchClient = hasTwitchConfig ? TwitchClient.withClientCredentials(config.twitch.clientId, config.twitch.clientSecret) : null;

const TwitchInfo = () => {

    const overlayInfo = useContext(OverlayContext);
    const [maxViewers, setMaxViewers] = useState(0)
    const [viewers, setViewers] = useState(null);

    useEffect(() => {
        const getUserInfo = () => {
            if (overlayInfo.twitchUserName) {
                twitchClient.helix.streams.getStreamByUserName(overlayInfo.twitchUserName)
                    .then(stream => {
                        setViewers(stream.viewers)
                        setMaxViewers(m => stream.viewers ? Math.max(stream.viewers, m) : 0)
                    })
                    .catch(() => setViewers(null));
            } else {
                setViewers(null);
            }
        }

        setMaxViewers(0)
        const intervalHandler = setInterval(getUserInfo, 30000);
        getUserInfo();
        return () => clearInterval(intervalHandler);
    }, [overlayInfo.twitchUserName]);

    return (viewers != null) ? <div className="TwitchViewerCount">
        <div className="Icon"><TwitchGlitchPurple size="1em"/></div>
        <div className="Count">{viewers}</div>
        <div className={((maxViewers) && (maxViewers !== viewers)) ? "Max" : "NoMax"}>{maxViewers}</div>
    </div> : <></>;
}

const NoTwitchInfo = () => <></>

export default hasTwitchConfig ? TwitchInfo : NoTwitchInfo;
