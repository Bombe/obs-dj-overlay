import React from "react"
import Box from "@material-ui/core/Box"
import {TwitchEmbed} from "react-twitch-embed"
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom"

import {Sources} from "./context/sources"
import AdminSection from "./main"
import styles from "./Admin.module.css"
import config from "../../utils/config"
import {MessageAdmin} from "./message/MessageAdmin"
import {ShowAdmin} from "./show/ShowAdmin"
import {TrackAdmin} from "./track/TrackAdmin"
import {TwitchAdmin} from "./twitch/TwitchAdmin"

const Admin = () => {

    const twitchChannel = config.twitch.channel

    const {path} = useRouteMatch()

    return (
        <Router>
            <Switch>
                <Route path={`${path}/embed/show`}>
                    <ShowAdmin/>
                </Route>
                <Route path={`${path}/embed/track`}>
                    <TrackAdmin/>
                </Route>
                <Route path={`${path}/embed/message`}>
                    <MessageAdmin/>
                </Route>
                <Route path={`${path}/embed/twitch`}>
                    <TwitchAdmin/>
                </Route>
                <Route exact path={path}>
                    <Sources>
                        <div className={styles.Admin}>
                            <Box className={styles.Screen} display="flex" flexDirection="row">
                                <Box className={styles.Left} flexGrow={1}>
                                    <AdminSection/>
                                </Box>
                                <Box className={styles.Right}>
                                    <Box display="flex" flexDirection="column" height="100%">
                                        <Box id="preview-frame" height={225}>
                                            <iframe id="preview-iframe" className={styles.Preview} style={{transform: "scale(0.3125)", transformOrigin: "0 0", overflow: "hidden"}} title="Preview"
                                                    width={1280} height={720} src={"/preview"}/>
                                        </Box>
                                        <Box flexGrow={1}><TwitchEmbed muted={true} channel={twitchChannel} parent={["localhost"]} width="100%" height="100%"/></Box>
                                    </Box>
                                </Box>
                            </Box>
                        </div>
                    </Sources>
                </Route>
            </Switch>
        </Router>
    )

}

export {Admin}
