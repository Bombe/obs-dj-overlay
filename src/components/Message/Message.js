import React, {useContext, useEffect} from "react";

import OverlayContext from "../Overlay/";

import "./Message.css";

const fromPx = (withPx) => withPx.replace("px", "")

const Message = () => {

    const overlayInfo = useContext(OverlayContext)

    useEffect(() => {
        const containerElement = document.querySelector(".Message");
        const containerStyle = window.getComputedStyle(containerElement);
        const containerWidth = fromPx(containerStyle.width);
        const containerHeight = fromPx(containerStyle.height);
        const textElement = containerElement.querySelector(".Text");
        const textStyle = window.getComputedStyle(textElement);
        const textWidth = fromPx(textStyle.width);
        const textHeight = fromPx(textStyle.height);
        const scale = Math.min(containerWidth / textWidth, containerHeight / textHeight);
        if (isFinite(scale)) {
            textElement.setAttribute("style", "font-size: " + Math.floor(scale * 100) + "%;");
        }
    }, [overlayInfo.message]);

    return (
        <div className="Message">
            <div className="Text">{overlayInfo.message}</div>
        </div>
    );
}

export {Message};