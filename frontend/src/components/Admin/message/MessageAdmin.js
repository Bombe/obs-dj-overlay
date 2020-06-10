import React from "react"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"

import Group from "../../Group"
import SelectOnFocusTextField from "../../selectOnFocus"
import {onValueEventRun} from "../../../utils/event"

const textAreaEnterHandler = (action) => (event) => {
    if (event.key === "Enter" && event.ctrlKey) {
        action(event)
        event.target.select()
    }
}

const MessageAdmin = ({message, setMessage, originalMessage, sendMessage}) => {

    const restoreMessage = () => {
        setMessage(originalMessage)
    }

    const modificationsPresent = (message !== originalMessage)

    return (
        <Group title="Message">
            <form onSubmit={sendMessage}>
                <Grid container spacing={2} direction="column" alignItems="stretch">
                    <Grid item xs={12}>
                        <SelectOnFocusTextField label="A message to display" variant="filled" value={message} onChange={onValueEventRun(setMessage)} onKeyPress={textAreaEnterHandler(sendMessage)}
                                                fullWidth={true} multiline={true} rows={6} helperText="Press Ctrl-Enter to submit!" error={message !== originalMessage}/>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" alignItems="center">
                            <Box flexGrow={1}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Box>
                            <Box style={{paddingLeft: "16px"}}><Button type="reset" variant="contained" fullWidth={true} onClick={restoreMessage} disabled={!modificationsPresent}>Restore</Button></Box>
                        </Box>
                    </Grid>
                </Grid>
            </form>
        </Group>
    )

}

export {MessageAdmin}
