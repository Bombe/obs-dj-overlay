import {DoneAll} from "@material-ui/icons"
import React from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"

const TwitchAdmin = ({username, setUsername, originalUsername, sendTwitchData}) => {

    const restoreTwitchData = () => {
        setUsername(originalUsername)
    }

    const modificationsPresent = (username !== originalUsername)

    return (
        <Group title="Twitch">
            <form onSubmit={sendTwitchData}>
                <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={12}>
                        <SelectOnFocusTextField label="Twitch user to show viewer count for" variant="filled" value={username} onChange={onValueEventRun(setUsername)} onKeyPress={onEnter(blur, false)}
                                                fullWidth={true} error={username !== originalUsername}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}><Button type="submit" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button></Box>
                            <Box style={{paddingLeft: "16px"}}><Button type="reset" variant="contained" fullWidth={true} onClick={restoreTwitchData} disabled={!modificationsPresent}>Restore</Button></Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Group>
    )

}

export {TwitchAdmin}
