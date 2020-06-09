import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, {useEffect, useRef, useState} from "react"

import overlayService from "../../services/overlay"
import Group from "../Group"

import styles from "./Admin.module.css"

const onEvent = (setter) => (event) => setter(event.target.value)
const onEnter = (focuser) => (event) => {
    if (event.key === "Enter") {
        focuser()
        event.preventDefault()
    }
}

/* shamelessly stolen from https://stackoverflow.com/a/54159564/43582 */
const useFocus = () => {
    const htmlElementRef = useRef()
    return [htmlElementRef, () => htmlElementRef.current && htmlElementRef.current.focus()]
}

const SelectOnFocusTextField = (props) => {
    return <TextField {...props} onFocus={(event) => event.target.select()}/>
}

const Admin = () => {

    const [trackNumber, setTrackNumber] = useState(0)
    const [trackArtist, setTrackArtist] = useState("")
    const [trackTitle, setTrackTitle] = useState("")
    const [showTitle, setShowTitle] = useState("")
    const [showSubtitle, setShowSubtitle] = useState("")
    const [nextShow, setNextShow] = useState("")
    const [message, setMessage] = useState("")
    const [twitchUserName, setTwitchUserName] = useState("")

    const [showSubtitleField, focusShowSubtitle] = useFocus()
    const [nextShowField, focusNextShow] = useFocus()

    const [trackArtistField, focusTrackArtist] = useFocus()
    const [trackTitleField, focusTrackTitle] = useFocus()

    const setFilteredTrackNumber = (value) => {
        setTrackNumber(parseInt(value.replace(/[^0-9]/, "")) || 0)
    }

    const sendShowInfo = (event) => {
        overlayService.setShowInfo(showTitle, showSubtitle, nextShow)
        event.preventDefault()
    }

    const sendTrackInfo = (event) => {
        overlayService.setTrackInfo(trackNumber, trackArtist, trackTitle)
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
                setMessage(overlayInfo.message)
                setTwitchUserName(overlayInfo.twitchUserName)
            })
    }, [])

    return (
        <div className={styles.Admin}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid item xs={6}>
                    <Group title="Show">
                        <form onSubmit={sendShowInfo}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField label="The title of the show" variant="filled" value={showTitle} onChange={onEvent(setShowTitle)}
                                                            onKeyPress={onEnter(focusShowSubtitle)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField inputRef={showSubtitleField} label="The subtitle of the show" variant="filled" value={showSubtitle}
                                                            onChange={onEvent(setShowSubtitle)} onKeyPress={onEnter(focusNextShow)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField inputRef={nextShowField} label="Announcement for the next show" variant="filled" value={nextShow}
                                                            onChange={onEvent(setNextShow)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
                <Grid item xs={6}>
                    <Group title="Track">
                        <form onSubmit={sendTrackInfo}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField label="The number of the track" variant="filled" value={trackNumber} onChange={onEvent(setFilteredTrackNumber)}
                                                            onKeyPress={onEnter(focusTrackArtist)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField inputRef={trackArtistField} label="The artist of the track" variant="filled" value={trackArtist}
                                                            onChange={onEvent(setTrackArtist)} onKeyPress={onEnter(focusTrackTitle)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField inputRef={trackTitleField} label="The title of the track" variant="filled" value={trackTitle}
                                                            onChange={onEvent(setTrackTitle)} fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
                <Grid item xs={6}>
                    <Group title="Message">
                        <form onSubmit={sendMessage}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField label="A message to display" variant="filled" value={message} onChange={onEvent(setMessage)}
                                                            fullWidth={true}/>
                                </Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
                <Grid item xs={6}>
                    <Group title="Twitch">
                        <form onSubmit={sendTwitchData}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}>
                                    <SelectOnFocusTextField label="Twitch user to show viewer count for" variant="filled" value={twitchUserName} onChange={onEvent(setTwitchUserName)}
                                                            fullWidth={true}/>
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