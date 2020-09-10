import React, {useContext} from "react"
import {Typography} from "@material-ui/core"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"

import {SourcesContext} from "../context/sources"

import styles from "./Status.module.css"

const Status = () => {

    const sources = useContext(SourcesContext)

    const traktorConnected = sources.traktor && (sources.traktor.length !== 0)
    const errorDetected = !traktorConnected

    return (
        <>
            <AppBar position="fixed" style={{top: "auto", bottom: 0}}>
                <Toolbar variant="dense" className={errorDetected ? styles.Error : styles.Okay}>
                    <Typography className={traktorConnected ? styles.Online : styles.Offline}>Traktor</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense"/>
        </>
    )

}

export {Status as default}
