import React, { useContext } from 'react'
import { AppBar, Toolbar } from '@mui/material'

import { RuntimeVersionContext } from '../../../contexts/runtimeVersion'

import styles from './Status.module.css'

const Status = () => {

    const runtimeVersion = useContext(RuntimeVersionContext)

    return (
        <>
            <AppBar position="fixed" color="greys" sx={{ top: 'auto', bottom: 0 }}>
                <Toolbar variant="dense">
                    {runtimeVersion && <div className={styles.Version}>
                        <a href="https://github.com/Bombe/obs-dj-overlay">obs-dj-overlay</a>
                        <VersionInformation hash={runtimeVersion.hash} name={runtimeVersion.name}/>
                    </div>}
                </Toolbar>
            </AppBar>
            <Toolbar variant="dense"/>
        </>
    )

}

const VersionInformation = ({ hash, name }) => <span title={hash} className={styles.VersionInformation}>{name}</span>

export { Status as default }
