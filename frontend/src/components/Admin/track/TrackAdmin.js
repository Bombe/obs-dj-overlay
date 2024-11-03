import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Button, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material'
import { Delete, DoneAll, Edit, Healing, Refresh } from '@mui/icons-material'

import { blur, onEnter, onValueEventRun } from '../../../utils/event'
import useFocus from '../../../utils/focus'
import { OverlayServiceContext } from '../../../contexts/overlayService'
import { TrackContext } from '../../../contexts/track'
import SelectOnFocusTextField from '../../selectOnFocus'

import styles from './TrackAdmin.module.css'

const TrackAdmin = () => {

    const overlayService = useContext(OverlayServiceContext)
    const { artist: trackArtist, title: trackTitle, cover: trackCover, setArtist: setTrackArtist, setTitle: setTrackTitle, setCover: setTrackCover, cleanArtist, cleanTitle } = useContext(TrackContext)
    const [trackNumber, setTrackNumber] = useState(0)
    const [direction, setDirection] = useState("+1")
    const [originalTrackNumber, setOriginalTrackNumber] = useState(0)
    const [originalTrackArtist, setOriginalTrackArtist] = useState("")
    const [originalTrackTitle, setOriginalTrackTitle] = useState("")
    const [originalTrackCover, setOriginalTrackCover] = useState("")

    const setFilteredTrackNumber = (value) => {
        setTrackNumber(parseInt(value.toString().replace(/[^0-9]/, "")) || 0)
    }

    const sendTrackInfo = (event) => {
        overlayService.setTrackInfo(trackNumber, trackArtist, trackTitle, trackCover)
        setOriginalTrackNumber(trackNumber)
        setOriginalTrackArtist(trackArtist)
        setOriginalTrackTitle(trackTitle)
        setOriginalTrackCover(trackCover)
        if (trackNumber) {
            setTrackNumber(trackNumber + parseInt(direction, 10))
        }
        event.preventDefault()
    }

    const [trackArtistField, focusTrackArtist] = useFocus()
    const [trackTitleField, focusTrackTitle] = useFocus()
    const [trackCoverField, focusTrackCover] = useFocus()

    const restoreTrackInfo = () => {
        overlayService.get()
            .then(overlayInfo => {
                setTrackNumber(overlayInfo.track.number)
                setTrackArtist(overlayInfo.track.artist)
                setTrackTitle(overlayInfo.track.title)
                setTrackCover(overlayInfo.track.cover)
                setDirection(overlayInfo.track.direction === "down" ? "-1" : "+1")
                setOriginalTrackNumber(overlayInfo.track.number)
                setOriginalTrackArtist(overlayInfo.track.artist)
                setOriginalTrackTitle(overlayInfo.track.title)
                setOriginalTrackCover(overlayInfo.track.cover)
            })
    }

    const amendCurrentTrack = () => {
        overlayService.amendCurrentTrack(trackNumber, trackArtist, trackTitle, trackCover)
        setOriginalTrackNumber(trackNumber)
        setOriginalTrackArtist(trackArtist)
        setOriginalTrackTitle(trackTitle)
        setOriginalTrackCover(trackCover)
    }

    const resetLastTrack = () => {
        overlayService.setTrackInfo(0, '', '', '')
        overlayService.resetLastTrack()
        restoreTrackInfo()
    }

    const flipDirection = (value) => {
        setDirection(value.target.value)
        if (value.target.value === "-1") {
            overlayService.setTrackNumberDirection("down")
        } else {
            overlayService.setTrackNumberDirection("up")
        }
    }

    const setUncleanedTrackTitle = useCallback(title => setTrackTitle(title, false), [setTrackTitle])

    useEffect(restoreTrackInfo, [overlayService, setTrackNumber, setTrackArtist, setTrackTitle, setTrackCover, setOriginalTrackNumber, setOriginalTrackArtist, setOriginalTrackTitle, setOriginalTrackCover])

    return (
        <form onSubmit={sendTrackInfo} className={styles.Track}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                    <RadioGroup value={direction} onChange={flipDirection}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}>
                                <SelectOnFocusTextField id="track-number-input" label="The number of the track" variant="filled" value={trackNumber} onChange={onValueEventRun(setFilteredTrackNumber)}
                                                        onKeyPress={onEnter(focusTrackArtist, true)} fullWidth={true} error={trackNumber !== originalTrackNumber} tabIndex={2}/>
                            </Box>
                            <Box style={{paddingLeft: "16px", paddingRight: "16px"}}>Direction:</Box>
                            <Box><FormControlLabel control={<Radio/>} label="-1" value="-1"/></Box>
                            <Box><FormControlLabel control={<Radio/>} label="+1" value="+1"/></Box>
                        </Box>
                    </RadioGroup>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex">
                        <SelectOnFocusTextField id="track-artist-input" inputRef={trackArtistField} label="The artist of the track" variant="filled" value={trackArtist} onChange={onValueEventRun(setTrackArtist)}
                                            onKeyPress={onEnter(focusTrackTitle, true)} fullWidth={true} error={trackArtist !== originalTrackArtist}/>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button color="greys" variant="contained" aria-label="Clean Artist" onClick={cleanArtist} style={{height: "100%"}}><Healing/></Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex">
                        <SelectOnFocusTextField id="track-title-input" inputRef={trackTitleField} label="The title of the track" variant="filled" value={trackTitle} onChange={onValueEventRun(setUncleanedTrackTitle)}
                                                onKeyPress={onEnter(focusTrackCover, true)} fullWidth={true} error={trackTitle !== originalTrackTitle}/>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button color="greys" variant="contained" aria-label="Clean Title" onClick={cleanTitle} style={{height: "100%"}}><Healing/></Button>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    <SelectOnFocusTextField id="track-cover-input" inputRef={trackCoverField} label="The cover of the track" variant="filled" value={trackCover} onChange={onValueEventRun(setTrackCover)}
                                            onKeyPress={onEnter(blur, true)} fullWidth={true} error={trackCover !== originalTrackCover}/>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}>
                            <Button type="submit" color="greys" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button>
                        </Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" color="greys" variant="contained" fullWidth={true} onClick={amendCurrentTrack} startIcon={<Edit/>}>Amend</Button>
                        </Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" color="greys" variant="contained" fullWidth={true} onClick={restoreTrackInfo} startIcon={<Refresh/>}>Reload</Button>
                        </Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" color="greys" variant="contained" fullWidth={true} onClick={resetLastTrack} startIcon={<Delete/>} className={styles.ResetButton}>Reset</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )

}

export {TrackAdmin}
