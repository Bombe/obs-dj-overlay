import React, {useEffect, useState} from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import {Delete, DoneAll, Undo} from "@material-ui/icons"

import {onValueEventRun} from "../../../utils/event"
import overlayService from "../../../services/overlay"
import SelectOnFocusTextField from "../../selectOnFocus"

import styles from "./MessageAdmin.module.css"

const textAreaEnterHandler = (action) => (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
        action(event)
        event.target.select()
    }
}

const MessageAdmin = () => {

    const [message, setMessage] = useState("")
    const [originalMessage, setOriginalMessage] = useState("")

    const sendMessage = (event) => {
        overlayService.setMessage(message)
        setOriginalMessage(message)
        event.preventDefault()
    }

    const clearMessage = () => {
        setMessage("")
    }

    const restoreMessage = () => {
        setMessage(originalMessage)
    }

    const messageIsClear = (message === "")
    const modificationsPresent = (message !== originalMessage)

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setMessage(overlayInfo.message)
                setOriginalMessage(overlayInfo.message)
            })
    }, [])

    return (
        <form onSubmit={sendMessage} className={styles.Message}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                    <SelectOnFocusTextField label="A message to display" variant="filled" value={message} onChange={onValueEventRun(setMessage)} onKeyPress={textAreaEnterHandler(sendMessage)}
                                            fullWidth={true} multiline={true} minRows={6} helperText="Press Ctrl-Enter to submit!" error={message !== originalMessage}/>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}><Button type="submit" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button></Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button variant="contained" fullWidth={true} onClick={clearMessage} disabled={messageIsClear} startIcon={<Delete/>}>Clear</Button>
                        </Box>
                        <Box style={{paddingLeft: "16px"}}>
                            <Button type="reset" variant="contained" fullWidth={true} onClick={restoreMessage} disabled={!modificationsPresent} startIcon={<Undo/>}>Restore</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )

}

export {MessageAdmin}
