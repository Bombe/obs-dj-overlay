import React from "react"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import Group from "../../Group"

import MessageAdmin from "../message"
import ShowAdmin from "../show"
import TrackAdmin from "../track"
import TwitchAdmin from "../twitch"
import HistoryAdmin from "../history"

import styles from "./AdminSection.module.css"

const AdminSection = () => {

    return (
        <Box className={styles.AdminSection}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid item xs={12} sm={6} lg={4}>
                    <Group title="Show" expanded={false}>
                        <ShowAdmin/>
                    </Group>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Group title="Track">
                      <TrackAdmin/>
                    </Group>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Group title="Message">
                        <MessageAdmin/>
                    </Group>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Group title="Twitch" expanded={false}>
                        <TwitchAdmin/>
                    </Group>
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                    <Group title="History" expanded={false}>
                        <HistoryAdmin/>
                    </Group>
                </Grid>
            </Grid>
        </Box>
    )
}

export {AdminSection}
