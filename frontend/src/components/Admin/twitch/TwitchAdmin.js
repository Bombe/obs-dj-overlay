import React from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"

const TwitchAdmin = ({username, setUsername, originalUsername, sendTwitchData}) => {

    return (
        <Group title="Twitch">
            <form onSubmit={sendTwitchData}>
                <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={12}>
                        <SelectOnFocusTextField label="Twitch user to show viewer count for" variant="filled" value={username} onChange={onValueEventRun(setUsername)} onKeyPress={onEnter(blur, false)}
                                                fullWidth={true} error={username !== originalUsername}/>
                    </Grid>
                    <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                </Grid>
            </form>
        </Group>
    )

}

export {TwitchAdmin}
