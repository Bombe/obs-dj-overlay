import Box from "@material-ui/core/Box"
import React from "react"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import {blur, onEnter, onValueEventRun} from "../../../utils/event"
import useFocus from "../../../utils/focus"
import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"

const ShowAdmin = ({showTitle, showSubtitle, nextShow, setShowTitle, setShowSubtitle, setNextShow, sendShowInfo, originalShowTitle, originalShowSubtitle, originalNextShow}) => {

    const [showSubtitleField, focusShowSubtitle] = useFocus()
    const [nextShowField, focusNextShow] = useFocus()

    const restoreShowInfo = () => {
        setShowTitle(originalShowTitle)
        setShowSubtitle(originalShowSubtitle)
        setNextShow(originalNextShow)
    }

    return (
        <Group title="Show">
            <form onSubmit={sendShowInfo}>
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
                            <Box flexGrow={1}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Box>
                            <Box style={{paddingLeft: "16px"}}><Button type="reset" variant="contained" fullWidth={true} onClick={restoreShowInfo}>Restore</Button></Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Group>
    )
}

export {ShowAdmin}