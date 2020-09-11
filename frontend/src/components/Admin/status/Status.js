import React, {useContext, useEffect, useState} from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"

import {SourcesContext} from "../context/sources"

import styles from "./Status.module.css"

const Status = () => {

    const sources = useContext(SourcesContext)
    const [hidden, setHidden] = useState(!sources.loaded)

    const traktorConnected = sources.traktor && (sources.traktor.length !== 0)
    const errorDetected = !traktorConnected

    useEffect(() => {
        if (sources.loaded) {
            setHidden(false)
        }
    }, [sources])

    return (
        <>
            <AppBar position="fixed" style={{top: "auto", bottom: 0, visibility: hidden ? "hidden" : "inherit"}}>
                <Toolbar variant="dense" className={errorDetected ? styles.Error : styles.Okay} style={{minHeight: "inherit", paddingTop: "0.5ex", paddingBottom: "0.5ex"}}>
                    <Typography className={traktorConnected ? styles.Online : styles.Offline}>Traktor</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense"/>
        </>
    )

}

export {Status as default}
