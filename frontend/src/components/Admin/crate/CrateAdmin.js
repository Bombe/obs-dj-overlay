import React, {useState} from 'react'
import Grid from "@material-ui/core/Grid";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {TableBody, TableRow} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import {Delete, PlaylistAdd} from "@material-ui/icons";
import * as uuid from "uuid";

import {onValueEventRun} from "../../../utils/event";

import styles from "./CrateAdmin.module.css"

const parseRecords = jsonObject => {
    if (!Array.isArray(jsonObject)) {
        return [];
    }
    return jsonObject
        .map(object =>
            ({id: object.id || uuid.v4(), artist: object.artist, title: object.title, cover: object.cover})
        )
        .filter(object => object.artist !== undefined && object.title !== undefined && object.cover !== undefined)
}

const CrateAdmin = () => {

    const [crateEntries, setCrateEntries] = useState([])
    const [importString, setImportString] = useState("")

    const importFromClipboard = () => {
        try {
            const parsedImport = JSON.parse(importString)
            const parsedRecords = parseRecords(parsedImport)
            setCrateEntries(parsedRecords)
            setImportString("")
        } catch (SyntaxError) {
        }
    }

    const clearCrate = () => {
        setCrateEntries([])
    }

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
                                <TableRow key={record.id} title="record">
                                    <TableCell>{record.artist}</TableCell>
                                    <TableCell>{record.title}</TableCell>
                                    <TableCell style={{display: 'none'}}>{record.cover}</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex">
                    <Box flexGrow={1}><TextField id="import-string" label="Import" fullWidth={true} value={importString} onChange={onValueEventRun(setImportString)}></TextField></Box>
                    <Box paddingLeft="16px"><Button onClick={importFromClipboard} variant="contained" startIcon={<PlaylistAdd/>}>Import</Button></Box>
                    <Box paddingLeft="16px"><Button onClick={clearCrate} variant="contained" startIcon={<Delete/>}>Clear</Button></Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export {CrateAdmin}
