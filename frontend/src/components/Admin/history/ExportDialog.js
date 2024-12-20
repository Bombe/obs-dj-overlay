import React, { useCallback, useEffect, useState } from 'react'
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, Grid2 as Grid, TextField } from '@mui/material'
import { Assignment } from '@mui/icons-material'
import {CopyToClipboard} from "react-copy-to-clipboard/lib/Component"

import playlist from "../../../utils/playlist"
import htmlTable from "../../../utils/playlist/html-table"
import mixcloud from "../../../utils/playlist/mixcloud"

import styles from "./HistoryAdmin.module.css"

const ExportDialog = ({open, setOpened, historyEntries, onCopy = (text) => {}}) => {

    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [restrictTracks, setRestrictTracks] = useState(false)
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

    const toggleRestrictTracks = useCallback(() => {
        setRestrictTracks(!restrictTracks)
    }, [restrictTracks, setRestrictTracks])

    useEffect(() => {
        setPlaylistEntries(playlist.collect(historyEntries, from, to, restrictTracks))
    }, [historyEntries, from, to, restrictTracks])

    useEffect(() => {
        setHtmlTablePlaylist(htmlTable.export(playlistEntries, from))
    }, [playlistEntries, from])

    useEffect(() => {
        setMixcloudPlaylist(mixcloud.export(playlistEntries, from))
    }, [playlistEntries, from])

    return (
        <Dialog open={open} onClose={closeDialog}>
            <DialogTitle>Select time to export</DialogTitle>
            <DialogContent>
                <Grid container direction="column" spacing={2}>
                    <Grid paddingTop={1}><TextField label="From" onChange={changeFrom} type="datetime-local" value={from} slotProps={{ htmlInput: { step: 1, role: 'textbox' }, inputLabel: { shrink: true } }}/></Grid>
                    <Grid><TextField label="To" onChange={changeTo} type="datetime-local" value={to} slotProps={{ htmlInput: { step: 1, role: 'textbox' }, inputLabel: { shrink: true } }}/></Grid>
                    <FormControlLabel label="Restrict to Time Selection" control={<Checkbox checked={restrictTracks} onChange={toggleRestrictTracks}/>}/>
                </Grid>
            </DialogContent>
            <DialogActions className={styles.ExportDialog}>
                <CopyToClipboard text={htmlTablePlaylist} onCopy={() => onCopy(htmlTablePlaylist)}>
                    <Button disabled={from === "" || to === ""} variant="contained" color="greys" startIcon={<Assignment/>}>HTML Table</Button>
                </CopyToClipboard>
                <CopyToClipboard text={mixcloudPlaylist} onCopy={() => onCopy(mixcloudPlaylist)}>
                    <Button disabled={from === "" || to === ""} variant="contained" color="greys" startIcon={<Assignment/>}>Mixcloud</Button>
                </CopyToClipboard>
            </DialogActions>
        </Dialog>
    )

}

export {ExportDialog}
