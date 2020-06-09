import React from "react"

import styles from "./Group.module.css"

const Group = (props) => {
    return (
        <div className={styles.Group}>
            <div className={styles.GroupTitle}>
                <span>{props.title}</span>
            </div>
            {props.children}
        </div>
    )
}

export {Group}