import React, { useContext } from "react";
import OverlayContext from "../Overlay";
import styles from "./TrackInfo.module.css";

const TrackInfo = () => {
    const overlayInfo = useContext(OverlayContext);

    return (overlayInfo.artist || overlayInfo.title) ? (
        <div className={styles.info}>
            <div className={styles.artist}>{overlayInfo.artist}</div>
            <div className={styles.title}>{overlayInfo.title}</div>
        </div>
    ) : <></>;
}

export default TrackInfo;
