import React, { useEffect, useState } from "react";
import TwitchClient from 'twitch';
import { TwitchGlitchPurple } from "../Logo/";
import config from "../../config.json";
import styles from "./TwitchInfo.module.css";

const twitchClient = TwitchClient.withClientCredentials(config.twitch.clientId, config.twitch.clientSecret);

const TwitchInfo = () => {

    const [ timer, setTimer ] = useState(() => {});
    const [ viewers, setViewers ] = useState(null);

    useEffect(() => {
        async function getUserInfo() {
            const user = await twitchClient.helix.users.getUserByName(config.twitch.userName);
            let viewerCount = null
            if (user) {
                const stream = await twitchClient.helix.streams.getStreamByUserId(user);
                if (stream) {
                    viewerCount = stream.viewers;
                }
            }
            setViewers(viewerCount);
            setTimer(setTimeout(getUserInfo, 30000));
        }
        getUserInfo();
        return () => clearTimeout(timer);
    }, [viewers]);

    return (viewers != null) ? <div className={styles.twitchViewerCount}>
        <div className={styles.icon}><TwitchGlitchPurple size="1em"/></div>
        <div className={styles.count}>{viewers}</div>
    </div> : <></>;
}

export { TwitchInfo };
