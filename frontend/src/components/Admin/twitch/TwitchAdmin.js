import React, {useEffect, useRef, useState} from "react"
import { Box, Button, Grid } from '@mui/material'
import { DoneAll, Undo } from '@mui/icons-material'

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import overlayService from "../../../services/overlay"
import SelectOnFocusTextField from "../../selectOnFocus"
import config from "../../../utils/config"

import styles from "./TwitchAdmin.module.css"

const TwitchAdmin = () => {

    const submitButton = useRef(null)
    const [twitchUserName, setTwitchUserName] = useState("")
    const [originalTwitchUserName, setOriginalTwitchUserName] = useState("")

    const sendTwitchData = (event) => {
        overlayService.setTwitchData(twitchUserName)
        setOriginalTwitchUserName(twitchUserName)
        event.preventDefault()
    }

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setTwitchUserName(overlayInfo.twitchUserName)
                setOriginalTwitchUserName(overlayInfo.twitchUserName)
                if (overlayInfo.twitchUserName === "") {
                    setTwitchUserName(config.twitch.channel)
                    submitButton.current.click()
                }
            })
    }, [])

    const restoreTwitchData = () => {
        setTwitchUserName(originalTwitchUserName)
    }

    const modificationsPresent = (twitchUserName !== originalTwitchUserName)

    return (
        <form onSubmit={sendTwitchData} className={styles.Twitch}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                    <SelectOnFocusTextField label="Twitch user to show viewer count for" variant="filled" value={twitchUserName} onChange={onValueEventRun(setTwitchUserName)}
                                            onKeyPress={onEnter(blur, false)} fullWidth={true} error={twitchUserName !== originalTwitchUserName}/>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}><Button ref={submitButton} type="submit" color="greys" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button></Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" color="greys" variant="contained" fullWidth={true} onClick={restoreTwitchData} disabled={!modificationsPresent} startIcon={<Undo/>}>Restore</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )

}

export {TwitchAdmin}
