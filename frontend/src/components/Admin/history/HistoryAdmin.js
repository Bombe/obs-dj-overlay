import {TableBody, TableRow} from "@material-ui/core"
import TableContainer from "@material-ui/core/TableContainer"
import moment from "moment"
import React, {useContext, useEffect, useState} from 'react'
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import Table from "@material-ui/core/Table"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import {Delete, Refresh, Save} from "@material-ui/icons"

import {HistoryServiceContext} from '../../../contexts/historyService'
import {ExportDialog} from "./"

import styles from "./HistoryAdmin.module.css"

const HistoryAdmin = () => {

    const historyService = useContext(HistoryServiceContext)

    const [historyEntries, setHistoryEntries] = useState([])
    const [exportDialogOpen, setExportDialogOpen] = useState(false)

    const loadHistoryEntries = () => {
        historyService.entries()
            .then(response => response.json())
            .then(setHistoryEntries)
    }

    const showExportDialog = () => {
        setExportDialogOpen(true)
    }

    const resetHistory = () => {
        historyService.reset()
        loadHistoryEntries()
    }

    useEffect(loadHistoryEntries, [historyService])

    return (
        <form className={styles.History}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
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
                <Grid item xs={12}>
                    <Box display="flex">
                        <Box flexGrow={1}><Button onClick={showExportDialog} disabled={historyEntries.length === 0} variant="contained" fullWidth={true} startIcon={<Save/>}>Export</Button></Box>
                        <ExportDialog open={exportDialogOpen} setOpened={setExportDialogOpen} historyEntries={historyEntries}/>
                        <Box flexGrow={1} style={{paddingLeft: "16px"}}><Button onClick={loadHistoryEntries} variant="contained" fullWidth={true} startIcon={<Refresh/>}>Reload</Button></Box>
                        <Box flexGrow={1} style={{paddingLeft: "16px"}}><Button onClick={resetHistory} variant="contained" fullWidth={true} startIcon={<Delete/>}>Reset</Button></Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )

}

export {HistoryAdmin}
