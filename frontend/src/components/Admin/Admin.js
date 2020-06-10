import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React, {useEffect, useState} from "react"

import overlayService from "../../services/overlay"
import useFocus from "../../utils/focus"
import {blur, onEnter, onValueEventRun} from "../../utils/event"
import Group from "../Group"
import SelectOnFocusTextField from "../selectOnFocus"

import ShowAdmin from "./show"
import styles from "./Admin.module.css"

const textAreaEnterHandler = (action) => (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
        action(event)
        event.target.select()
    }
}

const Admin = () => {

    const [trackNumber, setTrackNumber] = useState(0)
    const [trackArtist, setTrackArtist] = useState("")
    const [trackTitle, setTrackTitle] = useState("")
    const [showTitle, setShowTitle] = useState("")
    const [showSubtitle, setShowSubtitle] = useState("")
    const [nextShow, setNextShow] = useState("")
    const [originalShowTitle, setOriginalShowTitle] = useState("")
    const [originalShowSubtitle, setOriginalShowSubtitle] = useState("")
    const [originalNextShow, setOriginalNextShow] = useState("")
    const [message, setMessage] = useState("")
    const [twitchUserName, setTwitchUserName] = useState("")

    const [trackArtistField, focusTrackArtist] = useFocus()
    const [trackTitleField, focusTrackTitle] = useFocus()

    const setFilteredTrackNumber = (value) => {
        setTrackNumber(parseInt(value.replace(/[^0-9]/, "")) || 0)
    }

    const decrementTrackNumber = () => {
        setTrackNumber(trackNumber - 1)
    }

    const sendShowInfo = (event) => {
        overlayService.setShowInfo(showTitle, showSubtitle, nextShow)
        setOriginalShowTitle(showTitle)
        setOriginalShowSubtitle(showSubtitle)
        setOriginalNextShow(nextShow)
        event.preventDefault()
    }

    const sendTrackInfo = (event) => {
        overlayService.get()
            .then(overlayInfo => {
                if (((overlayInfo.track.artist !== trackArtist) || (overlayInfo.track.title !== trackTitle)) && trackNumber && (overlayInfo.track.number === trackNumber)) {
                    setTrackNumber(trackNumber + 1)
                    overlayService.setTrackInfo(trackNumber + 1, trackArtist, trackTitle)
                } else {
                    overlayService.setTrackInfo(trackNumber, trackArtist, trackTitle)
                }
            })
        event.preventDefault()
    }

    const sendMessage = (event) => {
        overlayService.setMessage(message)
        event.preventDefault()
    }

    const sendTwitchData = (event) => {
        overlayService.setTwitchData(twitchUserName)
        event.preventDefault()
    }

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setTrackNumber(overlayInfo.track.number)
                setTrackArtist(overlayInfo.track.artist)
                setTrackTitle(overlayInfo.track.title)
                setShowTitle(overlayInfo.show.title)
                setShowSubtitle(overlayInfo.show.subtitle)
                setNextShow(overlayInfo.show.nextShow)
                setOriginalShowTitle(overlayInfo.show.title)
                setOriginalShowSubtitle(overlayInfo.show.subtitle)
                setOriginalNextShow(overlayInfo.show.nextShow)
                setMessage(overlayInfo.message)
                setTwitchUserName(overlayInfo.twitchUserName)
            })
    }, [])

    return (
        <div className={styles.Admin}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <ShowAdmin showTitle={showTitle} showSubtitle={showSubtitle} nextShow={nextShow} setShowTitle={setShowTitle} setShowSubtitle={setShowSubtitle} setNextShow={setNextShow}
                               sendShowInfo={sendShowInfo} originalShowTitle={originalShowTitle} originalShowSubtitle={originalShowSubtitle} originalNextShow={originalNextShow}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Group title="Track">
                        <form onSubmit={sendTrackInfo}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}>
                                    <Box display="flex" alignItems="center">
                                        <Box flexGrow={1}>
                                            <SelectOnFocusTextField label="The number of the track" variant="filled" value={trackNumber} onChange={onValueEventRun(setFilteredTrackNumber)}
                                                                    onKeyPress={onEnter(focusTrackArtist, true)} fullWidth={true}/>
                                        </Box>
                                        <Box style={{paddingLeft: "16px"}}>
                                            <Button fullWidth={true} variant="contained" onClick={decrementTrackNumber}>-</Button>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField inputRef={trackArtistField} label="The artist of the track" variant="filled" value={trackArtist}
                                                            onChange={onValueEventRun(setTrackArtist)} onKeyPress={onEnter(focusTrackTitle, true)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField inputRef={trackTitleField} label="The title of the track" variant="filled" value={trackTitle}
                                                            onChange={onValueEventRun(setTrackTitle)} onKeyPress={onEnter(blur, false)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Group title="Message">
                        <form onSubmit={sendMessage}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField label="A message to display" variant="filled" value={message} onChange={onValueEventRun(setMessage)} onKeyPress={textAreaEnterHandler(sendMessage)}
                                                            fullWidth={true} multiline={true} rows={4} helperText="Press Ctrl-Enter to submit!"/>
                                </Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
                <Grid item xs={12} sm={6} lg={4} xl={3}>
                    <Group title="Twitch">
                        <form onSubmit={sendTwitchData}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField label="Twitch user to show viewer count for" variant="filled" value={twitchUserName} onChange={onValueEventRun(setTwitchUserName)}
                                                            onKeyPress={onEnter(blur, false)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
            </Grid>
        </div>
    )
}

export {Admin}