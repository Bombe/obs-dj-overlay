import React, {useContext, useEffect, useState} from "react";
import TwitchClient from 'twitch';
import config from "../Config";
import {TwitchGlitchPurple} from "../Logo/";
import OverlayContext from "../Overlay";
import "./TwitchInfo.css";

const hasTwitchConfig = (config && config.twitch && config.twitch.clientId && config.twitch.clientSecret);
const twitchClient = hasTwitchConfig ? TwitchClient.withClientCredentials(config.twitch.clientId, config.twitch.clientSecret) : null;

const TwitchInfo = () => {

    const overlayInfo = useContext(OverlayContext);
    const [viewers, setViewers] = useState(null);

    useEffect(() => {
        const getUserInfo = () => {
            if (overlayInfo.twitchUserName) {
                twitchClient.helix.streams.getStreamByUserName(overlayInfo.twitchUserName)
                    .then(stream => setViewers(stream.viewers))
                    .catch(() => setViewers(null));
            } else {
                setViewers(null);
            }
        }

        const intervalHandler = setInterval(getUserInfo, 30000);
        getUserInfo();
        return () => clearInterval(intervalHandler);
    }, [overlayInfo.twitchUserName]);

    return (viewers != null) ? <div className="TwitchViewerCount">
        <div className="Icon"><TwitchGlitchPurple size="1em"/></div>
        <div className="Count">{viewers}</div>
    </div> : <></>;
}

const NoTwitchInfo = () => <></>

export default hasTwitchConfig ? TwitchInfo : NoTwitchInfo;
