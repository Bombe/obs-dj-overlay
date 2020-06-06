import React, { useContext, useEffect, useState } from "react";
import TwitchClient from 'twitch';
import config from "../../config.json";
import { TwitchGlitchPurple } from "../Logo/";
import OverlayContext from "../Overlay";
import styles from "./TwitchInfo.module.css";

const twitchClient = TwitchClient.withClientCredentials(config.twitch.clientId, config.twitch.clientSecret);

const TwitchInfo = () => {

    const overlayInfo = useContext(OverlayContext);
    const [ viewers, setViewers ] = useState(null);

    useEffect(() => {
        async function getUserInfo() {
            let viewerCount = null;
            if (overlayInfo.twitchUserName) {
                const stream = await twitchClient.helix.streams.getStreamByUserName(overlayInfo.twitchUserName);
                if (stream) {
                    viewerCount = stream.viewers;
                }
            }
            setViewers(viewerCount);
        }
        getUserInfo();
    }, [Math.floor(Date.now() / 30000), overlayInfo.twitchUserName]);

    return (viewers != null) ? <div className={styles.twitchViewerCount}>
        <div className={styles.icon}><TwitchGlitchPurple size="1em"/></div>
        <div className={styles.count}>{viewers}</div>
    </div> : <></>;
}

export default TwitchInfo;
