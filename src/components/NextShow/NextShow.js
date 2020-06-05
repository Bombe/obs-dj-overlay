import React, { useContext } from "react";
import styles from "./NextShow.module.css";
import OverlayContext from "../Overlay";

const NextShow = () => {
    const overlayInfo = useContext(OverlayContext);

    return overlayInfo.nextShow ? (
        <div className={styles.container}>
            <div className={styles.scroller}>
                {overlayInfo.nextShow}
            </div>
        </div>
    ) : <></>

};

export default NextShow;
