import React, {useState} from "react"
import { Card, CardContent, CardHeader, Collapse, IconButton } from '@mui/material'
import { ExpandMore } from '@mui/icons-material'

import styles from "./Group.module.css"

const Group = (props) => {

    const [expanded, setExpanded] = useState((props.expanded === undefined) ? true : props.expanded)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <Card className={styles.Group}>
            <CardHeader className={styles.GroupTitle} title={props.title} action={
                <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more" className={expanded ? styles.expandOpen : ""}>
                    <ExpandMore/>
                </IconButton>
            }/>
            <CardContent className={styles.GroupContent}>
                <Collapse in={expanded}>
                    {props.children}
                </Collapse>
            </CardContent>
        </Card>
    )
}

export {Group}
