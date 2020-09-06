import React from "react"
import {CardContent} from "@material-ui/core"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"

import styles from "./Group.module.css"

const Group = (props) => {
    return (
        <Card className={styles.Group}>
            <CardHeader className={styles.GroupTitle} title={props.title}/>
            <CardContent className={styles.GroupContent}>
                {props.children}
            </CardContent>
        </Card>
    )
}

export {Group}
