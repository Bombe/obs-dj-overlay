import React from "react"
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom"

import AdminSection from "./main"
import styles from "./Admin.module.css"
import {MessageAdmin} from "./message/MessageAdmin"
import {ShowAdmin} from "./show/ShowAdmin"
import {TrackAdmin} from "./track/TrackAdmin"
import {TwitchAdmin} from "./twitch/TwitchAdmin"

const Admin = () => {

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
                    <div className={styles.Admin}>
                        <AdminSection/>
                    </div>
                </Route>
            </Switch>
        </Router>
    )

}

export {Admin}
