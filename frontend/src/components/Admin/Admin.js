import React from 'react'
import {BrowserRouter as Router, Route, Switch, useRouteMatch} from 'react-router-dom'

import WithSourcesService from '../../contexts/sourcesService'
import WithSources from '../../contexts/sources'
import AdminSection from './main'
import {MessageAdmin} from './message/MessageAdmin'
import {ShowAdmin} from './show/ShowAdmin'
import {Status} from './status'
import {TrackAdmin} from './track/TrackAdmin'
import {CrateAdmin} from './crate/CrateAdmin'
import {TwitchAdmin} from './twitch/TwitchAdmin'
import WithOverlayService from '../../contexts/overlayService'
import WithCrateService from '../../contexts/crateService'
import WithHistoryService from '../../contexts/historyService'
import WithTrack from '../../contexts/track'

const Admin = () => {

    const {path} = useRouteMatch()

    return (
        <WithOverlayService>
            <WithCrateService>
                <WithTrack>
                    <Router>
                        <Switch>
                            <Route path={`${path}/embed/show`}>
                                <ShowAdmin/>
                            </Route>
                            <Route path={`${path}/embed/track`}>
                                <TrackAdmin/>
                            </Route>
                            <Route path={`${path}/embed/crate`}>
                                <CrateAdmin/>
                            </Route>
                            <Route path={`${path}/embed/message`}>
                                <MessageAdmin/>
                            </Route>
                            <Route path={`${path}/embed/twitch`}>
                                <TwitchAdmin/>
                            </Route>
                            <Route exact path={path}>
                                <WithHistoryService>
                                    <WithSourcesService>
                                        <WithSources>
                                            <AdminSection/>
                                            <Status/>
                                        </WithSources>
                                    </WithSourcesService>
                                </WithHistoryService>
                            </Route>
                        </Switch>
                    </Router>
                </WithTrack>
            </WithCrateService>
        </WithOverlayService>
    )

}

export {Admin}
