import {DoneAll, Undo} from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import overlayService from "../../../services/overlay"
import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"

const TwitchAdmin = () => {

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
            })
    }, [])

    const restoreTwitchData = () => {
        setTwitchUserName(originalTwitchUserName)
    }

    const modificationsPresent = (twitchUserName !== originalTwitchUserName)

    return (
        <Group title="Twitch">
            <form onSubmit={sendTwitchData}>
                <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={12}>
                        <SelectOnFocusTextField label="Twitch user to show viewer count for" variant="filled" value={twitchUserName} onChange={onValueEventRun(setTwitchUserName)}
                                                onKeyPress={onEnter(blur, false)} fullWidth={true} error={twitchUserName !== originalTwitchUserName}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}><Button type="submit" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button></Box>
                            <Box style={{paddingLeft: "16px"}}>
                                <Button type="reset" variant="contained" fullWidth={true} onClick={restoreTwitchData} disabled={!modificationsPresent} startIcon={<Undo/>}>Restore</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Group>
    )

}

export {TwitchAdmin}
