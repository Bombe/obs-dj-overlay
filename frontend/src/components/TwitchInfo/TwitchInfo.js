import React, {useContext, useEffect, useState} from "react";
import {AppTokenAuthProvider} from '@twurple/auth'
import {ApiClient} from '@twurple/api'
import config from "../../utils/config";
import {TwitchGlitchPurple} from "../Logo/";
import {OverlayInfoContext} from "../../contexts/overlayInfo";
import "./TwitchInfo.css";

const hasTwitchConfig = (config && config.twitch && config.twitch.clientId && config.twitch.clientSecret);
const authProvider = new AppTokenAuthProvider(config.twitch.clientId, config.twitch.clientSecret)
const apiClient = new ApiClient({authProvider})

const TwitchInfo = () => {

    const overlayInfo = useContext(OverlayInfoContext);
    const [maxViewers, setMaxViewers] = useState(0)
    const [viewers, setViewers] = useState(null);

    useEffect(() => {
        const getUserInfo = () => {
            if (overlayInfo.twitchUserName) {
                apiClient.streams.getStreamByUserName(overlayInfo.twitchUserName)
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
    }, [overlayInfo, setViewers, setMaxViewers]);

    return (viewers != null) ? <div className="TwitchViewerCount">
        <div className="Icon"><TwitchGlitchPurple size="1em"/></div>
        <div className="Count">{viewers}</div>
        <div className={((maxViewers) && (maxViewers !== viewers)) ? "Max" : "NoMax"}>{maxViewers}</div>
    </div> : <></>;
}

const NoTwitchInfo = () => <></>

export default hasTwitchConfig ? TwitchInfo : NoTwitchInfo;
