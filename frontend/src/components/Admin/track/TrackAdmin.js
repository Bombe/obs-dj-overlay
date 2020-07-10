import {DoneAll, Undo} from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import useFocus from "../../../utils/focus"
import overlayService from "../../../services/overlay"
import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"

const TrackAdmin = () => {

    const [trackNumber, setTrackNumber] = useState(0)
    const [trackArtist, setTrackArtist] = useState("")
    const [trackTitle, setTrackTitle] = useState("")
    const [originalTrackNumber, setOriginalTrackNumber] = useState(0)
    const [originalTrackArtist, setOriginalTrackArtist] = useState("")
    const [originalTrackTitle, setOriginalTrackTitle] = useState("")

    const setFilteredTrackNumber = (value) => {
        setTrackNumber(parseInt(value.toString().replace(/[^0-9]/, "")) || 0)
    }

    const sendTrackInfo = (event) => {
        overlayService.setTrackInfo(trackNumber, trackArtist, trackTitle)
        setOriginalTrackNumber(trackNumber)
        setOriginalTrackArtist(trackArtist)
        setOriginalTrackTitle(trackTitle)
        if (trackNumber) {
            setTrackNumber(trackNumber + 1)
        }
        event.preventDefault()
    }

    const [trackArtistField, focusTrackArtist] = useFocus()
    const [trackTitleField, focusTrackTitle] = useFocus()

    const decrementTrackNumber = () => {
        setTrackNumber(trackNumber - 1)
    }

    const restoreTrackInfo = () => {
        setTrackNumber(originalTrackNumber)
        setTrackArtist(originalTrackArtist)
        setTrackTitle(originalTrackTitle)
    }

    const modificationsPresent = (trackNumber !== originalTrackNumber) || (trackArtist !== originalTrackArtist) || (trackTitle !== originalTrackTitle)

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setTrackNumber(overlayInfo.track.number)
                setTrackArtist(overlayInfo.track.artist)
                setTrackTitle(overlayInfo.track.title)
                setOriginalTrackNumber(overlayInfo.track.number)
                setOriginalTrackArtist(overlayInfo.track.artist)
                setOriginalTrackTitle(overlayInfo.track.title)
            })
    }, [])

    return (
        <Group title="Track">
            <form onSubmit={sendTrackInfo}>
                <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <SelectOnFocusTextField label="The number of the track" variant="filled" value={trackNumber} onChange={onValueEventRun(setFilteredTrackNumber)}
                                                        onKeyPress={onEnter(focusTrackArtist, true)} fullWidth={true} error={trackNumber !== originalTrackNumber} tabIndex={2}/>
                            </Box>
                            <Box style={{paddingLeft: "16px"}}>
                                <Button fullWidth={true} variant="contained" onClick={decrementTrackNumber} tabIndex={1}>-</Button>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectOnFocusTextField inputRef={trackArtistField} label="The artist of the track" variant="filled" value={trackArtist} onChange={onValueEventRun(setTrackArtist)}
                                                onKeyPress={onEnter(focusTrackTitle, true)} fullWidth={true} error={trackArtist !== originalTrackArtist}/>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectOnFocusTextField inputRef={trackTitleField} label="The title of the track" variant="filled" value={trackTitle} onChange={onValueEventRun(setTrackTitle)}
                                                onKeyPress={onEnter(blur, false)} fullWidth={true} error={trackTitle !== originalTrackTitle}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <Button type="submit" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button>
                            </Box>
                            <Box style={{paddingLeft: "16px"}}>
                                <Button type="reset" variant="contained" fullWidth={true} onClick={restoreTrackInfo} disabled={!modificationsPresent} startIcon={<Undo/>}>Restore</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Group>
    )

}

export {TrackAdmin}
