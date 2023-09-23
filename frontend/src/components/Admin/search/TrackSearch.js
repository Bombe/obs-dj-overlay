import React, {useContext, useState} from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {Reply, Search} from '@material-ui/icons'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import Table from '@material-ui/core/Table'
import {TableBody, TableRow, Tooltip, withStyles} from '@material-ui/core'
import TableContainer from '@material-ui/core/TableContainer'
import IconButton from '@material-ui/core/IconButton'

import {onEnter, onValueEventRun} from '../../../utils/event'
import {SearchServiceContext} from '../../../contexts/searchService'

import styles from './TrackSearch.module.css'

const NoBorderTooltip = withStyles(() => ({
    tooltip: {
        backgroundColor: 'inherit',
        border: 'none',
    },
}))(Tooltip);

const TrackSearch = ({setArtist, setTitle, setCover, scrollToTrack})  => {

    const searchService = useContext(SearchServiceContext)

    const [terms, setTerms] = useState("")
    const [results, setResults] = useState([])

    const startSearch = () => {
        const splitTerms = terms.toLowerCase().replace(/,/g, ' ').split(/ +/)
        searchService.search(splitTerms)
            .then(setResults)
    }

    const mergeArtists = artists => artists.join(', ')
    const mergeTitleAndMix = (title, mix) => title + (mix ? ' (' + mix + ')' : '')

    const exportRowValues = record => {
        setArtist(mergeArtists(record.artists))
        setTitle(mergeTitleAndMix(record.title, record.mix))
        setCover(record.cover)
        scrollToTrack()
    }

    return <div className={styles.Search}>
        <Grid container spacing={2} direction="column" alignItems="stretch">
            <Grid item xs={12}>
                <Box display="flex" alignItems="center">
                    <Box flexGrow={1}>
                        <TextField id='search-terms' fullWidth={true} variant='filled' label='Search Terms' value={terms} onChange={onValueEventRun(setTerms)} onKeyPress={onEnter(startSearch, true)}/>
                    </Box>
                    <Box style={{paddingLeft: '16px'}}>
                        <Button type='button' variant='contained' onClick={startSearch} startIcon={<Search/>}>Search</Button>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <TableContainer className={styles.Table}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell/>
                                <TableCell>Artist</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Cover</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {results.map((result, index) =>
                                <TableRow key={index} data-testid='row'>
                                    <TableCell className={styles.ButtonCell} padding='none'><IconButton size='small' onClick={() => { exportRowValues(result); setTerms('')} }><Reply/></IconButton></TableCell>
                                    <TableCell className={styles.ArtistCell} title='artist'>{mergeArtists(result.artists)}</TableCell>
                                    <TableCell className={styles.TitleCell} title='title'>{mergeTitleAndMix(result.title, result.mix)}</TableCell>
                                    <TableCell className={styles.CoverCell}><NoBorderTooltip title={<img alt='Cover' src={result.cover} style={{maxWidth: '500px'}}/>}><img alt='Cover' src={result.cover}/></NoBorderTooltip></TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    </div>
}

export {TrackSearch}
