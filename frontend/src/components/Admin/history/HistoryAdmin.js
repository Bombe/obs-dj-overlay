import React, { useCallback, useContext, useEffect, useState } from 'react'
import moment from "moment"
import { Box, Button, Grid2 as Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Delete, Refresh, Save } from '@mui/icons-material'

import {HistoryServiceContext} from '../../../contexts/historyService'
import {ExportDialog} from "./"

import styles from "./HistoryAdmin.module.css"

const HistoryAdmin = () => {

    const historyService = useContext(HistoryServiceContext)

    const [historyEntries, setHistoryEntries] = useState([])
    const [exportDialogOpen, setExportDialogOpen] = useState(false)

    const loadHistoryEntries = useCallback(() => {
        historyService.entries()
            .then(response => response.json())
            .then(setHistoryEntries)
    }, [historyService, setHistoryEntries])

    const showExportDialog = useCallback(() => {
        setExportDialogOpen(true)
    }, [setExportDialogOpen])

    const resetHistory = useCallback(async () => {
        historyService.reset().then(loadHistoryEntries)
    }, [historyService, loadHistoryEntries])

    useEffect(loadHistoryEntries, [loadHistoryEntries])

    return (
        <form className={styles.History}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid size='12'>
                    <TableContainer className={styles.Table}>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Artist</TableCell>
                                    <TableCell>Title</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {historyEntries.map(entry =>
                                    <TableRow key={entry.time}>
                                        <TableCell>{moment(entry.time).format("YYYY-MM-DD HH:mm:ss")}</TableCell>
                                        <TableCell>{entry.artist}</TableCell>
                                        <TableCell>{entry.title}</TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid size='12'>
                    <Box display="flex">
                        <Box flexGrow={1}><Button onClick={showExportDialog} disabled={historyEntries.length === 0} color="greys" variant="contained" fullWidth={true} startIcon={<Save/>}>Export</Button></Box>
                        <ExportDialog open={exportDialogOpen} setOpened={setExportDialogOpen} historyEntries={historyEntries}/>
                        <Box flexGrow={1} style={{paddingLeft: "16px"}}><Button onClick={loadHistoryEntries} color="greys" variant="contained" fullWidth={true} startIcon={<Refresh/>}>Reload</Button></Box>
                        <Box flexGrow={1} style={{paddingLeft: "16px"}}><Button onClick={resetHistory} color="greys" variant="contained" fullWidth={true} startIcon={<Delete/>} className={styles.ResetButton}>Reset</Button></Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )

}

export {HistoryAdmin}
