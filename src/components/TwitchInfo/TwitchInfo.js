import React, {useContext, useEffect, useState} from "react";
import TwitchClient from 'twitch';
import config from "../../config.json";
import {TwitchGlitchPurple} from "../Logo/";
import OverlayContext from "../Overlay";
import styles from "./TwitchInfo.module.css";

const twitchClient = TwitchClient.withClientCredentials(config.twitch.clientId, config.twitch.clientSecret);

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

    return (viewers != null) ? <div className={styles.twitchViewerCount}>
        <div className={styles.icon}><TwitchGlitchPurple size="1em"/></div>
        <div className={styles.count}>{viewers}</div>
    </div> : <></>;
}

export default TwitchInfo;
