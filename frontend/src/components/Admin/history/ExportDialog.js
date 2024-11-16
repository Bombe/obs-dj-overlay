import React, { useCallback, useEffect, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
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

    const closeDialog = useCallback(() => {
        setOpened(false)
    }, [setOpened])

    const changeFrom = useCallback(({target}) => {
        setFrom(target.value)
    }, [setFrom])

    const changeTo = useCallback(({target}) => {
        setTo(target.value)
    }, [setTo])

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
                <Grid container direction="column">
                    <Grid paddingTop={1}><TextField label="From" onChange={changeFrom} type="datetime-local" value={from} slotProps={{ htmlInput: { step: 1, role: 'textbox' }, inputLabel: { shrink: true } }}/></Grid>
                    <Grid paddingTop={2}><TextField label="To" onChange={changeTo} type="datetime-local" value={to} slotProps={{ htmlInput: { step: 1, role: 'textbox' }, inputLabel: { shrink: true } }}/></Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <CopyToClipboard text={htmlTablePlaylist}>
                    <Button disabled={from === "" || to === ""} color="greys" startIcon={<Assignment/>}>HTML Table</Button>
                </CopyToClipboard>
                <CopyToClipboard text={mixcloudPlaylist}>
                    <Button disabled={from === "" || to === ""} color="greys" startIcon={<Assignment/>}>Mixcloud</Button>
                </CopyToClipboard>
            </DialogActions>
        </Dialog>
    )

}

export {ExportDialog}
