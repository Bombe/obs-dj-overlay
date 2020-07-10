import Box from "@material-ui/core/Box"
import {DoneAll, Undo} from "@material-ui/icons"
import React, {useEffect, useState} from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import useFocus from "../../../utils/focus"
import overlayService from "../../../services/overlay"
import SelectOnFocusTextField from "../../selectOnFocus"

import styles from "./ShowAdmin.module.css"

const ShowAdmin = () => {

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
    }, [])

    return (
        <form onSubmit={sendShowInfo} className={styles.Show}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                    <SelectOnFocusTextField label="The title of the show" variant="filled" value={showTitle} onChange={onValueEventRun(setShowTitle)} onKeyPress={onEnter(focusShowSubtitle, true)}
                                            fullWidth={true} error={(originalShowTitle !== showTitle)}/>
                </Grid>
                <Grid item xs={12}>
                    <SelectOnFocusTextField inputRef={showSubtitleField} label="The subtitle of the show" variant="filled" value={showSubtitle} onChange={onValueEventRun(setShowSubtitle)}
                                            onKeyPress={onEnter(focusNextShow, true)} fullWidth={true} error={(originalShowSubtitle !== showSubtitle)}/>
                </Grid>
                <Grid item xs={12}>
                    <SelectOnFocusTextField inputRef={nextShowField} label="Announcement for the next show" variant="filled" value={nextShow} onChange={onValueEventRun(setNextShow)}
                                            onKeyPress={onEnter(blur, false)} fullWidth={true} error={(originalNextShow !== nextShow)}/>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}><Button type="submit" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button></Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" variant="contained" fullWidth={true} onClick={restoreShowInfo} disabled={!modificationsPresent} startIcon={<Undo/>}>Restore</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export {ShowAdmin}
