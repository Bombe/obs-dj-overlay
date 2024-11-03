import { useCallback, useContext, useEffect, useState } from 'react'
import { Box, Button, Grid } from '@mui/material'
import { Delete, DoneAll, Refresh } from '@mui/icons-material'

import { OverlayServiceContext } from '../../../contexts/overlayService'
import { onValueEventRun } from '../../../utils/event'
import SelectOnFocusTextField from '../../selectOnFocus'

import styles from './MessageAdmin.module.css'

const textAreaEnterHandler = (action) => (event) => {
    if (event.key === 'Enter' && event.ctrlKey) {
        action(event)
        event.target.select()
    }
}

const MessageAdmin = () => {

    const overlayService = useContext(OverlayServiceContext)
    const [message, setMessage] = useState('')

    const sendMessage = (event) => {
        overlayService.setMessage(message)
        event.preventDefault()
    }

    const reloadMessage = useCallback(() => {
        overlayService.get()
            .then(overlayInfo => {
                setMessage(overlayInfo.message)
            })
    }, [overlayService, setMessage])

    const resetMessage = useCallback(() => {
        setMessage('')
        overlayService.setMessage('')
    }, [setMessage, overlayService])

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setMessage(overlayInfo.message)
            })
    }, [overlayService, setMessage])

    return (
        <form onSubmit={sendMessage} className={styles.Message}>
            <Grid container spacing={2} direction="column" alignItems="stretch">
                <Grid item xs={12}>
                    <SelectOnFocusTextField id={'message'} label="A message to display" variant="filled" value={message} onChange={onValueEventRun(setMessage)} onKeyUp={textAreaEnterHandler(sendMessage)}
                                            fullWidth={true} multiline={true} minRows={6} helperText="Press Ctrl-Enter to submit!"/>
                </Grid>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center">
                        <Box flexGrow={1}><Button type="submit" color="greys" variant="contained" fullWidth={true} startIcon={<DoneAll/>}>Update</Button></Box>
                        <Box style={{ paddingLeft: '16px' }}>
                            <Button type="reset" color="greys" variant="contained" fullWidth={true} onClick={reloadMessage} startIcon={<Refresh/>}>Reload</Button>
                        </Box>
                        <Box style={{ paddingLeft: '16px' }}>
                            <Button type="reset" color="greys" variant="contained" fullWidth={true} onClick={resetMessage} startIcon={<Delete/>} className={styles.ResetButton}>Reset</Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )

}

export { MessageAdmin }
