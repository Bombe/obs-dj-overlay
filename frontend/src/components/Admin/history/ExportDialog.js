import React, {useEffect, useState} from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormLabel, Grid, TextField } from '@mui/material'
import { Assignment } from '@mui/icons-material'
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component"

import playlist from "../../../utils/playlist"
import htmlTable from "../../../utils/playlist/html-table"
import mixcloud from "../../../utils/playlist/mixcloud"

import styles from "./HistoryAdmin.module.css"

const ExportDialog = ({open, setOpened, historyEntries}) => {

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [playlistEntries, setPlaylistEntries] = useState([])
    const [htmlTablePlaylist, setHtmlTablePlaylist] = useState("")
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
        setHtmlTablePlaylist(htmlTable.export(playlistEntries, from))
    }, [playlistEntries, from])

    useEffect(() => {
        setMixcloudPlaylist(mixcloud.export(playlistEntries, from))
    }, [playlistEntries, from])

    return (
        <Dialog open={open} onClose={closeDialog} className={styles.ExportDialog}>
            <DialogTitle>Select time to export</DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={1}><FormLabel>From</FormLabel></Grid>
                    <Grid item xs={11}><TextField onChange={changeFrom} type="datetime-local" value={from} inputProps={{step: 1}}/></Grid>
                    <Grid item xs={1}><FormLabel>To</FormLabel></Grid>
                    <Grid item xs={11}><TextField onChange={changeTo} type="datetime-local" value={to} inputProps={{step: 1}}/></Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <CopyToClipboard text={htmlTablePlaylist}>
                    <Button disabled={from === undefined || to === undefined} color="greys" startIcon={<Assignment/>}>HTML Table</Button>
                </CopyToClipboard>
                <CopyToClipboard text={mixcloudPlaylist}>
                    <Button disabled={from === undefined || to === undefined} color="greys" startIcon={<Assignment/>}>Mixcloud</Button>
                </CopyToClipboard>
            </DialogActions>
        </Dialog>
    )

}

export {ExportDialog}
