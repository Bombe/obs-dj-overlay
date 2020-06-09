import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React, {useEffect, useState} from "react"

import overlayService from "../../services/overlay"
import Group from "../Group"

import styles from "./Admin.module.css"

const onEvent = (setter) => (event) => setter(event.target.value)

const Admin = () => {

    const [showTitle, setShowTitle] = useState("")
    const [showSubtitle, setShowSubtitle] = useState("")

    const sendShowInfo = () => {
        overlayService.setShowInfo(showTitle, showSubtitle)
    }

    useEffect(() => {
        overlayService.get()
            .then(overlayInfo => {
                setShowTitle(overlayInfo.show.title)
                setShowSubtitle(overlayInfo.show.subtitle)
            })
    }, [])

    return (
        <div className={styles.Admin}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid item xs={6}>
                    <Group title="Show">
                        <form onSubmit={sendShowInfo} action={""}>
                            <Grid container spacing={2} direction="column" alignItems="stretch">
                                <Grid item xs={12}><TextField label="The title of the show" variant="filled" value={showTitle} onChange={onEvent(setShowTitle)} fullWidth={true}/></Grid>
                                <Grid item xs={12}><TextField label="The subtitle of the show" variant="filled" value={showSubtitle} onChange={onEvent(setShowSubtitle)} fullWidth={true}/></Grid>
                                <Grid item xs={12}><Button type="submit" variant="contained" fullWidth={true}>Update</Button></Grid>
                            </Grid>
                        </form>
                    </Group>
                </Grid>
            </Grid>
        </div>
    )
}

/*

 */
export {Admin}