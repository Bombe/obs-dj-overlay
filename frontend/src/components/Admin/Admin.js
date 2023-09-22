import React, {useState} from "react"
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from "react-router-dom"

import {Sources} from "./context/sources"
import AdminSection from "./main"
import {MessageAdmin} from "./message/MessageAdmin"
import {ShowAdmin} from "./show/ShowAdmin"
import {Status} from "./status"
import {TrackAdmin} from "./track/TrackAdmin"
import {CrateAdmin} from "./crate/CrateAdmin";
import {TwitchAdmin} from "./twitch/TwitchAdmin"
import WithOverlayService from "../../contexts/overlayService";
import WithCrateService from "../../contexts/crateService";

const Admin = () => {

    const {path} = useRouteMatch()

    const [artist, setArtist] = useState("")
    const [title, setTitle] = useState("")
    const [cover, setCover] = useState("")

    return (
        <WithOverlayService>
            <WithCrateService>
                <Router>
                    <Switch>
                        <Route path={`${path}/embed/show`}>
                            <ShowAdmin/>
                        </Route>
                        <Route path={`${path}/embed/track`}>
                            <TrackAdmin artistState={[artist, setArtist]} titleState={[title, setTitle]} coverState={[cover, setCover]}/>
                        </Route>
                        <Route path={`${path}/embed/crate`}>
                            <CrateAdmin setArtist={setArtist} setTitle={setTitle} setCover={setCover}/>
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
            </WithCrateService>
        </WithOverlayService>
    )

}

export {Admin}
