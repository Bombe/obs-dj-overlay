import React, {useEffect, useState} from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"
import FormLabel from "@material-ui/core/FormLabel"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import {Assignment} from "@material-ui/icons"
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component"

import playlist from "../../../utils/playlist"
import mixcloud from "../../../utils/playlist/mixcloud"

import styles from "./HistoryAdmin.module.css"

const ExportDialog = ({open, setOpened, historyEntries}) => {

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [playlistEntries, setPlaylistEntries] = useState([])
    const [mixcloudPlaylist, setMixcloudPlaylist] = useState("")

    const closeDialog = () => {
        setOpened(false)
    }

    const changeFrom = ({target}) => {
        setFrom(target.value)
    }

    const changeTo = ({target}) => {
        setTo(target.value)
    }

    useEffect(() => {
        setPlaylistEntries(playlist.collect(historyEntries, from, to))
    }, [historyEntries, from, to])

    useEffect(() => {
        setMixcloudPlaylist(mixcloud.export(playlistEntries, from))
    }, [playlistEntries, from])

    return (
        <Dialog open={open} onClose={closeDialog} className={styles.ExportDialog}>
            <DialogTitle>Select time to export</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={1}><FormLabel>From</FormLabel></Grid>
                    <Grid item xs={11}><TextField onChange={changeFrom} type="datetime-local" value={from}/></Grid>
                    <Grid item xs={1}><FormLabel>To</FormLabel></Grid>
                    <Grid item xs={11}><TextField onChange={changeTo} type="datetime-local" value={to}/></Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <CopyToClipboard text={mixcloudPlaylist}>
                    <Button disabled={from === undefined || to === undefined} startIcon={<Assignment/>}>Mixcloud</Button>
                </CopyToClipboard>
            </DialogActions>
        </Dialog>
    )

}

export {ExportDialog}
