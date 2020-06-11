import React from "react"
import Box from "@material-ui/core/Box"
import {TwitchEmbed} from "react-twitch-embed"

import AdminSection from "./main"
import styles from "./Admin.module.css"

const Admin = () => {

    return (
        <div className={styles.Admin}>
            <Box className={styles.Screen} display="flex" flexDirection="row">
                <Box className={styles.Left} flexGrow={1}>
                    <AdminSection/>
                </Box>
                <Box className={styles.Right}>
                    <Box display="flex" flexDirection="column" height="100%">
                        <Box id="preview-frame" height={225}>
                            <iframe id="preview-iframe" style={{transform: "scale(0.3125)", transformOrigin: "0 0", overflow: "hidden"}} title="Preview" width={1280} height={720} src={"/"}/>
                        </Box>
                        <Box flexGrow={1}><TwitchEmbed muted={true} channel="bombe___" parent={["localhost"]} width="100%" height="100%"/></Box>
                    </Box>
                </Box>
            </Box>
        </div>
    )

}

export {Admin}
