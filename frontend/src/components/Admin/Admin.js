import Box from "@material-ui/core/Box"
import Paper from "@material-ui/core/Paper"
import React, {useEffect, useState} from "react"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import SplitPane from "react-split-pane"
import {TwitchChat, TwitchPlayer} from "react-twitch-embed"

import overlayService from "../../services/overlay"

import MessageAdmin from "./message"
import ShowAdmin from "./show"
import TrackAdmin from "./track"
import TwitchAdmin from "./twitch"
import styles from "./Admin.module.css"
import "./Resizer.css"

const Admin = () => {

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

    const setPlayerHeight = (size) => {
        const playerStyle = document.getElementById("twitch-video-player").style
        playerStyle.width = size.toString() + "px"
        playerStyle.height = (size * 9 / 16).toString() + "px"
        const previewStyle = document.getElementById("preview-frame").style
        previewStyle.width = size.toString() + "px"
        previewStyle.height = (size * 9/16).toString() + "px"
        document.getElementById("preview-iframe").style.transform = "scale("+(size/1280)+")"
    }

    return (
        <SplitPane split={"vertical"} primary={"second"} minSize={400} allowResize={true} onChange={setPlayerHeight}>
            <Paper className={styles.Admin}>
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
            <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                <Box id="preview-frame" height={225}>
                    <iframe id={"preview-iframe"} style={{transform: "scale(0.3125)", transformOrigin: "0 0", overflow: "hidden"}} title={"Preview"} width={1280} height={720} src={"/"}/>
                </Box>
                <Box><TwitchPlayer id="twitch-video-player" channel="bombe___" width={400} height={225} muted={true}/></Box>
                <Box flexGrow={1} id="twitch-chat-box"><TwitchChat id="twitch-chat" channel="bombe___" parent={["localhost"]} width="100%" height="100%"/></Box>
            </Box>
        </SplitPane>
    )
}

export {Admin}
