import React, {useContext, useEffect, useState} from 'react'
import { Box, Button, Grid2 as Grid } from '@mui/material'
import { DoneAll, Undo } from '@mui/icons-material'

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import useFocus from "../../../utils/focus"
import {OverlayServiceContext} from '../../../contexts/overlayService'
import SelectOnFocusTextField from "../../selectOnFocus"

import styles from "./ShowAdmin.module.css"

const ShowAdmin = () => {

    const overlayService = useContext(OverlayServiceContext)
    const [showTitle, setShowTitle] = useState("")
    const [showSubtitle, setShowSubtitle] = useState("")
    const [nextShow, setNextShow] = useState("")
    const [originalShowTitle, setOriginalShowTitle] = useState("")
    const [originalShowSubtitle, setOriginalShowSubtitle] = useState("")
    const [originalNextShow, setOriginalNextShow] = useState("")

    const sendShowInfo = (event) => {
        overlayService.setShowInfo(showTitle, showSubtitle, nextShow)
        setOriginalShowTitle(showTitle)
        setOriginalShowSubtitle(showSubtitle)
        setOriginalNextShow(nextShow)
        event.preventDefault()
    }

    const [showSubtitleField, focusShowSubtitle] = useFocus()
    const [nextShowField, focusNextShow] = useFocus()

    const restoreShowInfo = () => {
        setShowTitle(originalShowTitle)
        setShowSubtitle(originalShowSubtitle)
        setNextShow(originalNextShow)
    }

    const modificationsPresent = (showTitle !== originalShowTitle) || (showSubtitle !== originalShowSubtitle) || (nextShow !== originalNextShow)

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setShowTitle(overlayInfo.show.title)
                setShowSubtitle(overlayInfo.show.subtitle)
                setNextShow(overlayInfo.show.nextShow)
                setOriginalShowTitle(overlayInfo.show.title)
                setOriginalShowSubtitle(overlayInfo.show.subtitle)
                setOriginalNextShow(overlayInfo.show.nextShow)
            })
    }, [overlayService, setShowTitle, setShowSubtitle, setNextShow, setOriginalShowTitle, setOriginalShowSubtitle, setOriginalNextShow])

    return (
        <form onSubmit={sendShowInfo} className={styles.Show}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid size='12'>
                    <SelectOnFocusTextField id={'show-title'} label="The title of the show" variant="filled" value={showTitle} onChange={onValueEventRun(setShowTitle)} onKeyPress={onEnter(focusShowSubtitle, true)}
                                            fullWidth={true} error={(originalShowTitle !== showTitle)}/>
                </Grid>
                <Grid size='12'>
                    <SelectOnFocusTextField id={'show-subtitle'} inputRef={showSubtitleField} label="The subtitle of the show" variant="filled" value={showSubtitle} onChange={onValueEventRun(setShowSubtitle)}
                                            onKeyPress={onEnter(focusNextShow, true)} fullWidth={true} error={(originalShowSubtitle !== showSubtitle)}/>
                </Grid>
                <Grid size='12'>
                    <SelectOnFocusTextField id={'show-announcement'} inputRef={nextShowField} label="Announcement for the next show" variant="filled" value={nextShow} onChange={onValueEventRun(setNextShow)}
                                            onKeyPress={onEnter(blur, false)} fullWidth={true} error={(originalNextShow !== nextShow)}/>
                </Grid>
                <Grid size='12'>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}><Button type="submit" color="greys" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button></Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" color="greys" variant="contained" fullWidth={true} onClick={restoreShowInfo} disabled={!modificationsPresent} startIcon={<Undo/>}>Restore</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export {ShowAdmin}
