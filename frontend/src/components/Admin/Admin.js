import React from 'react'
import { Route, Routes } from 'react-router-dom'

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
import WithRuntimeVersion from '../../contexts/runtimeVersion'
import WithRuntimeService from '../../contexts/runtimeService'
import WithTwitchConfig from '../../contexts/twitchConfig'

const Admin = () => {

    return (
        <WithOverlayService>
            <WithCrateService>
                <WithTrack>
                    <Routes>
                        <Route path='embed/show' element={<ShowAdmin/>}/>
                        <Route path='embed/track' element={<TrackAdmin/>}/>
                        <Route path='embed/crate' element={<CrateAdmin/>}/>
                        <Route path='embed/message' element={<MessageAdmin/>}/>
                        <Route path='embed/twitch' element={<TwitchAdmin/>}/>
                        <Route exact path='' element={
                            <WithHistoryService>
                                <AdminSection/>
                                <WithRuntimeService>
                                    <WithRuntimeVersion>
                                        <WithTwitchConfig>
                                            <Status/>
                                        </WithTwitchConfig>
                                    </WithRuntimeVersion>
                                </WithRuntimeService>
                            </WithHistoryService>
                        }/>
                    </Routes>
                </WithTrack>
            </WithCrateService>
        </WithOverlayService>
    )

}

export {Admin}
