import React from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import useFocus from "../../../utils/focus"
import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"

const TrackAdmin = ({number, artist, title, setNumber, setArtist, setTitle, sendTrackInfo}) => {

    const [trackArtistField, focusTrackArtist] = useFocus()
    const [trackTitleField, focusTrackTitle] = useFocus()

    const decrementTrackNumber = () => {
        setNumber(number - 1)
    }

    return (
        <Group title="Track">
            <form onSubmit={sendTrackInfo}>
                <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <SelectOnFocusTextField label="The number of the track" variant="filled" value={number} onChange={onValueEventRun(setNumber)}
                                                        onKeyPress={onEnter(focusTrackArtist, true)} fullWidth={true}/>
                            </Box>
                            <Box style={{paddingLeft: "16px"}}>
                                <Button fullWidth={true} variant="contained" onClick={decrementTrackNumber}>-</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectOnFocusTextField inputRef={trackArtistField} label="The artist of the track" variant="filled" value={artist} onChange={onValueEventRun(setArtist)}
                                                onKeyPress={onEnter(focusTrackTitle, true)} fullWidth={true}/>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectOnFocusTextField inputRef={trackTitleField} label="The title of the track" variant="filled" value={title} onChange={onValueEventRun(setTitle)}
                                                onKeyPress={onEnter(blur, false)} fullWidth={true}/>
                    </Grid>
                    <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                </Grid>
            </form>
        </Group>
    )

}

export {TrackAdmin}