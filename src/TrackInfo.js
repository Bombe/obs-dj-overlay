import React, { useContext } from "react";
import { OverlayContext } from "./Overlay";
import styles from "./TrackInfo.module.css";

const TrackInfo = () => {
    const overlayInfo = useContext(OverlayContext);

    return (
        <div className={styles.info}>
            <OverlayContext.Consumer>{ (artist, title) => (
                <>
                    <div className={styles.artist}>{overlayInfo.artist}</div>
                    <div className={styles.title}>{overlayInfo.title}</div>
                </>
            )}</OverlayContext.Consumer>
        </div>
    );
}

export default TrackInfo;
