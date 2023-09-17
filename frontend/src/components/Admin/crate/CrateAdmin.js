import React, {useCallback, useContext, useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {TableBody, TableRow} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import {Delete, PlaylistAdd, Refresh} from "@material-ui/icons";
import * as uuid from "uuid";

import {onValueEventRun} from "../../../utils/event";
import {CrateServiceContext} from "../../CrateServiceContext";

import styles from "./CrateAdmin.module.css"

const sortRecords = (left, right) =>
    left.artist.toLowerCase().localeCompare(right.artist.toLowerCase()) ||
    left.title.toLowerCase().localeCompare(right.title.toLowerCase())

const CrateAdmin = ({setArtist, setTitle, setCover}) => {

    const crateService = useContext(CrateServiceContext)
    const [crateEntries, setCrateEntries] = useState([])
    const [importString, setImportString] = useState("")

    const reloadCrate = useCallback(() => {
        crateService.getRecords()
            .then(result => result.json())
            .then(records => {
                records.sort(sortRecords)
                return records
            })
            .then(records => records.map(record => ({...record, id: record.id || uuid.v4()})))
            .then(records => setCrateEntries(records))
    }, [crateService])

    const importFromInputField = () => {
        if (importString !== "") {
            crateService.importRecords(importString)
                .then(result => {
                    if (result.status === 200) {
                        setImportString("")
                    }
                })
                .then(reloadCrate)
        }
    }

    const clearCrate = () => {
        crateService.reset()
            .then(reloadCrate)
    }

    const exportRowValues = record => {
        setArtist(record.artist)
        setTitle(record.title)
        setCover(record.cover)
    }

    useEffect(() => {
        reloadCrate()
    }, [reloadCrate])

    return (
        <Grid container spacing={2} direction="column" alignItems="stretch" className={styles.Crate}>
            <Grid item xs={12}>
                <TableContainer className={styles.Table}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>Artist</TableCell>
                                <TableCell>Title</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {crateEntries.map(record =>
                                <TableRow key={record.id} title="record" data-id={record.id} data-artist={record.artist} data-title={record.title} data-cover={record.cover} onDoubleClick={() => exportRowValues(record)}>
                                    <TableCell>{record.artist}</TableCell>
                                    <TableCell>{record.title}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex">
                    <Box flexGrow={1}><TextField id="import-string" label="Import" fullWidth={true} value={importString} onChange={onValueEventRun(setImportString)}></TextField></Box>
                    <Box paddingLeft="16px"><Button onClick={importFromInputField} variant="contained" startIcon={<PlaylistAdd/>}>Import</Button></Box>
                    <Box paddingLeft="16px"><Button onClick={reloadCrate} variant="contained" startIcon={<Refresh/>}>Reload</Button></Box>
                    <Box paddingLeft="16px"><Button onClick={clearCrate} variant="contained" startIcon={<Delete/>}>Clear</Button></Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export {CrateAdmin}
