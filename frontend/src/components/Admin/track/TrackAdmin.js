import {DoneAll, Refresh} from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import useFocus from "../../../utils/focus"
import overlayService from "../../../services/overlay"
import SelectOnFocusTextField from "../../selectOnFocus"

import styles from "./TrackAdmin.module.css"

const TrackAdmin = () => {

    const [trackNumber, setTrackNumber] = useState(0)
    const [direction, setDirection] = useState("+1")
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
            setTrackNumber(trackNumber + parseInt(direction, 10))
        }
        event.preventDefault()
    }

    const [trackArtistField, focusTrackArtist] = useFocus()
    const [trackTitleField, focusTrackTitle] = useFocus()

    const restoreTrackInfo = () => {
        overlayService.get()
            .then(overlayInfo => {
                setTrackNumber(overlayInfo.track.number)
                setTrackArtist(overlayInfo.track.artist)
                setTrackTitle(overlayInfo.track.title)
                setDirection(overlayInfo.track.direction === "down" ? "-1" : "+1")
                setOriginalTrackNumber(overlayInfo.track.number)
                setOriginalTrackArtist(overlayInfo.track.artist)
                setOriginalTrackTitle(overlayInfo.track.title)
            })
    }

    const flipDirection = (value) => {
        setDirection(value.target.value)
        if (value.target.value === "-1") {
            overlayService.setTrackNumberDirection("down")
        } else {
            overlayService.setTrackNumberDirection("up")
        }
    }

    useEffect(restoreTrackInfo, [])

    return (
        <form onSubmit={sendTrackInfo} className={styles.Track}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                    <RadioGroup value={direction} onChange={flipDirection}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <SelectOnFocusTextField label="The number of the track" variant="filled" value={trackNumber} onChange={onValueEventRun(setFilteredTrackNumber)}
                                                        onKeyPress={onEnter(focusTrackArtist, true)} fullWidth={true} error={trackNumber !== originalTrackNumber} tabIndex={2}/>
                            </Box>
                            <Box style={{paddingLeft: "16px", paddingRight: "16px"}}>Direction:</Box>
                            <Box><FormControlLabel control={<Radio/>} label="-1" value="-1"/></Box>
                            <Box><FormControlLabel control={<Radio/>} label="+1" value="+1"/></Box>
                        </Box>
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <SelectOnFocusTextField inputRef={trackArtistField} label="The artist of the track" variant="filled" value={trackArtist} onChange={onValueEventRun(setTrackArtist)}
                                            onKeyPress={onEnter(focusTrackTitle, true)} fullWidth={true} error={trackArtist !== originalTrackArtist}/>
                </Grid>
                <Grid item xs={12}>
                    <SelectOnFocusTextField inputRef={trackTitleField} label="The title of the track" variant="filled" value={trackTitle} onChange={onValueEventRun(setTrackTitle)}
                                            onKeyPress={onEnter(blur, true)} fullWidth={true} error={trackTitle !== originalTrackTitle}/>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>
                            <Button type="submit" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button>
                        </Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" variant="contained" fullWidth={true} onClick={restoreTrackInfo} startIcon={<Refresh/>}>Reload</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )

}

export {TrackAdmin}
