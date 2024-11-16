import React, {useCallback, useContext, useEffect, useState} from 'react'
import { Box, Button, Grid2 as Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { Delete, PlaylistAdd, Refresh, Reply, Search } from '@mui/icons-material'
import * as uuid from "uuid";

import {compose, onEnter, onEscape, onValueEventRun} from '../../../utils/event'
import {CrateServiceContext} from "../../../contexts/crateService";
import {SearchServiceContext} from '../../../contexts/searchService'
import {TrackContext} from '../../../contexts/track'
import NoBorderTooltip from '../../custom/NoBorderTooltip'

import styles from "./CrateAdmin.module.css"

const sortRecords = (left, right) =>
    left.artist.toLowerCase().localeCompare(right.artist.toLowerCase()) ||
    left.title.toLowerCase().localeCompare(right.title.toLowerCase())

const CrateAdmin = ({scrollToTrack}) => {

    const crateService = useContext(CrateServiceContext)
    const searchService = useContext(SearchServiceContext)
    const { setArtist, setTitle, setCover } = useContext(TrackContext)
    const [searchString, setSearchString] = useState('')
    const [crateEntries, setCrateEntries] = useState([])
    const [displayedCrateEntries, setDisplayedCrateEntries] = useState([])
    const [importString, setImportString] = useState("")

    const addRandomIdIfNoneExists = records => records.map(record => ({...record, id: record.id || uuid.v4()}))

    const reloadCrate = useCallback(() => {
        crateService.getRecords()
            .then(result => result.json())
            .then(records => {
                records.sort(sortRecords)
                return records
            })
            .then(addRandomIdIfNoneExists)
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

    const exportRowValues = useCallback(record => {
        setArtist(record.artist)
        setTitle(record.title)
        setCover(record.cover)
        scrollToTrack()
        setSearchString('')
    }, [setArtist, setTitle, setCover, setSearchString, scrollToTrack])

    useEffect(() => {
        reloadCrate()
    }, [reloadCrate])

    const getEntriesMatchingSearchTerms = useCallback(searchTerms => {
        // shamelessly stolen from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#escaping
        const escapeRegExp = string => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

        const entryMatchesSearchTerm = (entry, searchTerm) => {
            const regExp = new RegExp(escapeRegExp(searchTerm), 'i')
            return entry.artist.match(regExp) || entry.title.match(regExp)
        }

        return searchTerms.split(/ +/).reduce((matches, term) => matches.filter(entry => entryMatchesSearchTerm(entry, term)), crateEntries)
    }, [crateEntries])

    useEffect(() => {
        setDisplayedCrateEntries(getEntriesMatchingSearchTerms(searchString))
    }, [getEntriesMatchingSearchTerms, setDisplayedCrateEntries, searchString])

    const mergeArtists = artists => artists.join(', ')
    const mergeTitleAndMix = (title, mix) => title + (mix ? ' (' + mix + ')' : '')
    const processSearchResults = useCallback(results => results.map(result => ({ artist: mergeArtists(result.artists), title: mergeTitleAndMix(result.title, result.mix), cover: result.cover })), [])

    const handleSearchTerms = useCallback(() => {
        if (searchString === '') {
            reloadCrate()
        } else if (displayedCrateEntries.length === 1) {
            exportRowValues(displayedCrateEntries.at(0))
        } else if (displayedCrateEntries.length === 0) {
            searchService.search(searchString.split(/ +/))
                .then(processSearchResults)
                .then(addRandomIdIfNoneExists)
                .then(setCrateEntries)
                .then(() => setSearchString(''))
        }
    }, [displayedCrateEntries, exportRowValues, processSearchResults, reloadCrate, searchService, searchString, setCrateEntries, setSearchString])

    return (
        <Grid container spacing={2} direction="column" alignItems="stretch" className={styles.Crate}>
            <Grid size='12'>
                <Box display="flex" alignItems='center'>
                    <Box flexGrow={1}><TextField id="search-string" label="Search" variant='filled' fullWidth={true} value={searchString} onChange={onValueEventRun(setSearchString)} onKeyUp={compose(onEscape(event => setSearchString("")), onEnter(handleSearchTerms, true))}/></Box>
                    <Box paddingLeft="16px"><Button onClick={() => {}} color="greys" variant="contained" startIcon={<Search/>}>Search</Button></Box>
                </Box>
            </Grid>
            <Grid size='12'>
                <TableContainer className={styles.Table}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Artist</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Cover</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {displayedCrateEntries.map(record =>
                                <TableRow key={record.id} title="record" data-id={record.id} data-artist={record.artist} data-title={record.title} data-cover={record.cover}>
                                    <TableCell className={styles.LoadButtonCell} padding='none' ><IconButton size='small' onClick={() => exportRowValues(record)} title='Load'><Reply/></IconButton></TableCell>
                                    <TableCell className={styles.ArtistCell}>{record.artist}</TableCell>
                                    <TableCell className={styles.TitleCell}>{record.title}</TableCell>
                                    <TableCell className={styles.CoverCell}><NoBorderTooltip title={<Box style={{display: 'flex', flexDirection: 'column'}}><img alt='Cover' src={record.cover}/></Box>} placement='left'><img alt='Cover' src={record.cover}/></NoBorderTooltip></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
            <Grid size='12'>
                <Box display="flex" alignItems='center'>
                    <Box flexGrow={1}><TextField id="import-string" label="Import" variant='filled' fullWidth={true} value={importString} onChange={onValueEventRun(setImportString)} onKeyUp={onEnter(importFromInputField, true)}/></Box>
                    <Box paddingLeft="16px"><Button onClick={importFromInputField} color="greys" variant="contained" startIcon={<PlaylistAdd/>}>Import</Button></Box>
                    <Box paddingLeft="16px"><Button onClick={reloadCrate} color="greys" variant="contained" startIcon={<Refresh/>}>Reload</Button></Box>
                    <Box paddingLeft="16px"><Button onClick={clearCrate} color="greys" variant="contained" startIcon={<Delete/>} className={styles.ResetButton}>Reset</Button></Box>
                </Box>
            </Grid>
        </Grid>
    )
}

export {CrateAdmin}
