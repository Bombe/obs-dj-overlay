import React from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import useFocus from "../../../utils/focus"
import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import overlayService from "../../../services/overlay"
import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"

const ShowAdmin = ({showTitle, showSubtitle, nextShow, setShowTitle, setShowSubtitle, setNextShow}) => {

    const [showSubtitleField, focusShowSubtitle] = useFocus()
    const [nextShowField, focusNextShow] = useFocus()

    const sendShowInfo = (event) => {
        overlayService.setShowInfo(showTitle, showSubtitle, nextShow)
        event.preventDefault()
    }

    return (
        <Group title="Show">
            <form onSubmit={sendShowInfo}>
                <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={12}>
                        <SelectOnFocusTextField label="The title of the show" variant="filled" value={showTitle} onChange={onValueEventRun(setShowTitle)} onKeyPress={onEnter(focusShowSubtitle, true)}
                                                fullWidth={true}/>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectOnFocusTextField inputRef={showSubtitleField} label="The subtitle of the show" variant="filled" value={showSubtitle} onChange={onValueEventRun(setShowSubtitle)}
                                                onKeyPress={onEnter(focusNextShow, true)} fullWidth={true}/>
                    </Grid>
                    <Grid item xs={12}>
                        <SelectOnFocusTextField inputRef={nextShowField} label="Announcement for the next show" variant="filled" value={nextShow} onChange={onValueEventRun(setNextShow)}
                                                onKeyPress={onEnter(blur, false)} fullWidth={true}/>
                    </Grid>
                    <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                </Grid>
            </form>
        </Group>
    )
}

export {ShowAdmin}