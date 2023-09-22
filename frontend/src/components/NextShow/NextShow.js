import React, { useContext } from "react";
import "./NextShow.css";
import {OverlayInfoContext} from "../../contexts/overlayInfo";

const NextShow = () => {
    const overlayInfo = useContext(OverlayInfoContext);

    return overlayInfo.show.nextShow ? (
        <div className="NextShow">
            <div className="Text">
                {overlayInfo.show.nextShow}
            </div>
        </div>
    ) : <></>

};

export default NextShow;
