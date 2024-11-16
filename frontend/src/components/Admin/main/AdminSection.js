import React, {useRef} from "react"
import { Box, Grid2 as Grid, Typography } from '@mui/material'
import Group from "../../Group"

import MessageAdmin from "../message"
import ShowAdmin from "../show"
import TrackAdmin from "../track"
import TwitchAdmin from "../twitch"
import HistoryAdmin from "../history"
import CrateAdmin from "../crate"

import styles from "./AdminSection.module.css"

const AdminSection = () => {

    const trackSectionReference = useRef(null)

    const scrollToTrackSection = () => {
        trackSectionReference.current.scrollIntoView()
    }

    return (
        <Box className={styles.AdminSection}>
            <Typography variant="h3">Admin Interface</Typography>
            <Grid className={styles.Inputs} container spacing={3}>
                <Grid size={{xs: 12, sm: 6, lg: 4}}>
                    <div ref={trackSectionReference}>
                        <Group title="Track">
                            <TrackAdmin/>
                        </Group>
                    </div>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 4}}>
                    <Group title="Crate">
                        <CrateAdmin scrollToTrack={scrollToTrackSection}/>
                    </Group>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 4}}>
                    <Group title="Message">
                        <MessageAdmin/>
                    </Group>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 4}}>
                    <Group title="Show" expanded={false}>
                        <ShowAdmin/>
                    </Group>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 4}}>
                    <Group title="Twitch" expanded={false}>
                        <TwitchAdmin/>
                    </Group>
                </Grid>
                <Grid size={{xs: 12, sm: 6, lg: 4}}>
                    <Group title="History" expanded={false}>
                        <HistoryAdmin/>
                    </Group>
                </Grid>
            </Grid>
        </Box>
    )
}

export {AdminSection}
