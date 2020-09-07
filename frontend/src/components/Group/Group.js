import React, {useState} from "react"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import CardHeader from "@material-ui/core/CardHeader"
import Collapse from "@material-ui/core/Collapse"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import IconButton from "@material-ui/core/IconButton"

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
                    <ExpandMoreIcon/>
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
