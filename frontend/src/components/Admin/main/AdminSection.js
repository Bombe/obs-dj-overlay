import React, {useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid"
import Paper from "@material-ui/core/Paper"
import Typography from "@material-ui/core/Typography"

import overlayService from "../../../services/overlay"
import MessageAdmin from "../message"
import ShowAdmin from "../show"
import TrackAdmin from "../track"
import TwitchAdmin from "../twitch"
import styles from "./AdminSection.module.css"

const AdminSection = () => {

    const [trackNumber, setTrackNumber] = useState(0)
    const [trackArtist, setTrackArtist] = useState("")
    const [trackTitle, setTrackTitle] = useState("")
    const [originalTrackNumber, setOriginalTrackNumber] = useState(0)
    const [originalTrackArtist, setOriginalTrackArtist] = useState("")
    const [originalTrackTitle, setOriginalTrackTitle] = useState("")
    const [showTitle, setShowTitle] = useState("")
    const [showSubtitle, setShowSubtitle] = useState("")
    const [nextShow, setNextShow] = useState("")
    const [originalShowTitle, setOriginalShowTitle] = useState("")
    const [originalShowSubtitle, setOriginalShowSubtitle] = useState("")
    const [originalNextShow, setOriginalNextShow] = useState("")
    const [message, setMessage] = useState("")
    const [originalMessage, setOriginalMessage] = useState("")
    const [twitchUserName, setTwitchUserName] = useState("")
    const [originalTwitchUserName, setOriginalTwitchUserName] = useState("")

    const setFilteredTrackNumber = (value) => {
        setTrackNumber(parseInt(value.toString().replace(/[^0-9]/, "")) || 0)
    }

    const sendShowInfo = (event) => {
        overlayService.setShowInfo(showTitle, showSubtitle, nextShow)
        setOriginalShowTitle(showTitle)
        setOriginalShowSubtitle(showSubtitle)
        setOriginalNextShow(nextShow)
        event.preventDefault()
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

    const sendMessage = (event) => {
        overlayService.setMessage(message)
        setOriginalMessage(message)
        event.preventDefault()
    }

    const sendTwitchData = (event) => {
        overlayService.setTwitchData(twitchUserName)
        setOriginalTwitchUserName(twitchUserName)
        event.preventDefault()
    }

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setTrackNumber(overlayInfo.track.number)
                setTrackArtist(overlayInfo.track.artist)
                setTrackTitle(overlayInfo.track.title)
                setOriginalTrackNumber(overlayInfo.track.number)
                setOriginalTrackArtist(overlayInfo.track.artist)
                setOriginalTrackTitle(overlayInfo.track.title)
                setShowTitle(overlayInfo.show.title)
                setShowSubtitle(overlayInfo.show.subtitle)
                setNextShow(overlayInfo.show.nextShow)
                setOriginalShowTitle(overlayInfo.show.title)
                setOriginalShowSubtitle(overlayInfo.show.subtitle)
                setOriginalNextShow(overlayInfo.show.nextShow)
                setMessage(overlayInfo.message)
                setOriginalMessage(overlayInfo.message)
                setTwitchUserName(overlayInfo.twitchUserName)
                setOriginalTwitchUserName(overlayInfo.twitchUserName)
            })
    }, [])

    return (
        <Paper className={styles.AdminSection}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid item xs={12} sm={6} lg={4}>
                    <ShowAdmin showTitle={showTitle} showSubtitle={showSubtitle} nextShow={nextShow} setShowTitle={setShowTitle} setShowSubtitle={setShowSubtitle} setNextShow={setNextShow}
                               sendShowInfo={sendShowInfo} originalShowTitle={originalShowTitle} originalShowSubtitle={originalShowSubtitle} originalNextShow={originalNextShow}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <TrackAdmin number={trackNumber} artist={trackArtist} title={trackTitle} setNumber={setFilteredTrackNumber} setArtist={setTrackArtist} setTitle={setTrackTitle}
                                originalNumber={originalTrackNumber} originalArtist={originalTrackArtist} originalTitle={originalTrackTitle} sendTrackInfo={sendTrackInfo}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <MessageAdmin message={message} setMessage={setMessage} originalMessage={originalMessage} sendMessage={sendMessage}/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <TwitchAdmin username={twitchUserName} setUsername={setTwitchUserName} originalUsername={originalTwitchUserName} sendTwitchData={sendTwitchData}/>
                </Grid>
            </Grid>
        </Paper>
    )
}

export {AdminSection}
