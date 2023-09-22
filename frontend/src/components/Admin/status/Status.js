import React, {useContext, useEffect, useState} from "react"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import {makeStyles} from "@material-ui/core/styles"

import {SourcesContext} from "../../../contexts/sources"
import RuntimeService from "../../../services/runtime"

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
    const [runtimeVersion, setRuntimeVersion] = useState()

    const traktorConnected = sources.traktor && (sources.traktor.length !== 0)

    useEffect(() => {
        if (sources.loaded) {
            setHidden(false)
        }
    }, [sources])

    useEffect(() => {
        RuntimeService.get()
            .then(runtime => setRuntimeVersion(runtime.version))
    }, [])

    return (
        <>
            <AppBar position="fixed" classes={appBarStyle} style={{visibility: hidden ? "hidden" : "inherit"}}>
                <Toolbar variant="dense" className={styles.Toolbar}>
                    <div className={[styles.Traktor, traktorConnected ? styles.Online : styles.Offline].join(" ")}>Traktor</div>
                    {runtimeVersion && <div className={styles.Version}>
                        <a href="https://github.com/Bombe/obs-dj-overlay">obs-dj-overlay</a> <VersionInformation hash={runtimeVersion.hash} name={runtimeVersion.name}/>
                    </div>}
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense"/>
        </>
    )

}

const VersionInformation = ({hash, name}) => {
    return <span title={hash}>{name}</span>
}

export {Status as default}
