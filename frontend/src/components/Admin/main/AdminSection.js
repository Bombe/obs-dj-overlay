import React from "react"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"

import MessageAdmin from "../message"
import ShowAdmin from "../show"
import TrackAdmin from "../track"
import TwitchAdmin from "../twitch"
import styles from "./AdminSection.module.css"

const AdminSection = () => {

    return (
        <Box className={styles.AdminSection}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid item xs={12} sm={6} lg={4}>
                    <ShowAdmin/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <TrackAdmin/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <MessageAdmin/>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <TwitchAdmin/>
                </Grid>
            </Grid>
        </Box>
    )
}

export {AdminSection}
