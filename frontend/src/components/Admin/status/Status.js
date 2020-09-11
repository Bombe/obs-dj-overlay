import React, {useContext, useEffect, useState} from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import {makeStyles} from "@material-ui/core/styles"

import {SourcesContext} from "../context/sources"

import styles from "./Status.module.css"

const createAppBarStyles = makeStyles({
    colorPrimary: {
        color: "inherit",
        backgroundColor: "inherit"
    },
    positionFixed: {
        top: "auto",
        bottom: 0
    }
})

const Status = () => {

    const appBarStyle = createAppBarStyles()
    const sources = useContext(SourcesContext)
    const [hidden, setHidden] = useState(!sources.loaded)

    const traktorConnected = sources.traktor && (sources.traktor.length !== 0)

    useEffect(() => {
        if (sources.loaded) {
            setHidden(false)
        }
    }, [sources])

    return (
        <>
            <AppBar position="fixed" classes={appBarStyle} style={{visibility: hidden ? "hidden" : "inherit"}}>
                <Toolbar variant="dense" className={styles.Toolbar}>
                    <div className={[styles.Traktor, traktorConnected ? styles.Online : styles.Offline].join(" ")}>Traktor</div>
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense"/>
        </>
    )

}

export {Status as default}
