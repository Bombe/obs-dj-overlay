import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, {useEffect, useState} from "react"

import overlayService from "../../services/overlay"
import Group from "../Group"

import styles from "./Admin.module.css"

const onEvent = (setter) => (event) => setter(event.target.value)

const Admin = () => {

    const [trackNumber, setTrackNumber] = useState(0)
    const [trackArtist, setTrackArtist] = useState("")
    const [trackTitle, setTrackTitle] = useState("")
    const [showTitle, setShowTitle] = useState("")
    const [showSubtitle, setShowSubtitle] = useState("")

    const setFilteredTrackNumber = (value) => {
        setTrackNumber(parseInt(value.replace(/[^0-9]/, "")) || 0)
    }

    const sendShowInfo = () => {
        overlayService.setShowInfo(showTitle, showSubtitle)
    }

    const sendTrackInfo = (event) => {
        overlayService.setTrackInfo(trackNumber, trackArtist, trackTitle)
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
            })
    }, [])

    return (
        <div className={styles.Admin}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid item xs={6}>
                    <Group title="Show">
                        <form onSubmit={sendShowInfo} action={""}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}><TextField label="The title of the show" variant="filled" value={showTitle} onChange={onEvent(setShowTitle)} fullWidth={true}/></Grid>
                                <Grid item xs={12}><TextField label="The subtitle of the show" variant="filled" value={showSubtitle} onChange={onEvent(setShowSubtitle)} fullWidth={true}/></Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
                <Grid item xs={6}>
                    <Group title="Track">
                        <form onSubmit={sendTrackInfo}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}><TextField label="The number of the track" variant="filled" value={trackNumber} onChange={onEvent(setFilteredTrackNumber)} fullWidth={true}/></Grid>
                                <Grid item xs={12}><TextField label="The artist of the track" variant="filled" value={trackArtist} onChange={onEvent(setTrackArtist)} fullWidth={true}/></Grid>
                                <Grid item xs={12}><TextField label="The title of the track" variant="filled" value={trackTitle} onChange={onEvent(setTrackTitle)} fullWidth={true}/></Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
            </Grid>
        </div>
    )
}

/*

 */
export {Admin}