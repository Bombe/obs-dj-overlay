import React, { useContext } from "react";
import "./NextShow.css";
import OverlayContext from "../Overlay";

const NextShow = () => {
    const overlayInfo = useContext(OverlayContext);

    return overlayInfo.show.nextShow ? (
        <div className="NextShow">
            <div className="Text">
                {overlayInfo.show.nextShow}
            </div>
        </div>
    ) : <></>

};

export default NextShow;
