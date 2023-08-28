import React from "react"
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom"

import {Sources} from "./context/sources"
import AdminSection from "./main"
import {MessageAdmin} from "./message/MessageAdmin"
import {ShowAdmin} from "./show/ShowAdmin"
import {Status} from "./status"
import {TrackAdmin} from "./track/TrackAdmin"
import {TwitchAdmin} from "./twitch/TwitchAdmin"
import {WithOverlayService} from "../OverlayServiceContext";

const Admin = () => {

    const {path} = useRouteMatch()

    return (
        <WithOverlayService>
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
                            <AdminSection/>
                            <Status/>
                        </Sources>
                    </Route>
                </Switch>
            </Router>
        </WithOverlayService>
    )

}

export {Admin}
