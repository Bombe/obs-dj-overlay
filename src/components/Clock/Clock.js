import React, {useEffect, useState} from "react";
import "./Clock.css";

const clockOptions = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric"
};

const formatter = new Intl.DateTimeFormat("default", clockOptions);
const Clock = () => {

    const [timeString, setTimeString] = useState();

    useEffect(() => {
        const updateTimeString = () => {
            setTimeString(formatter.format(new Date()));
        }
        const intervalHandler = setInterval(updateTimeString, 200);
        updateTimeString();
        return () => clearInterval(intervalHandler);
    }, []);

    return timeString ? (<div className="Clock">{timeString}</div>) : <></>;

}

export {Clock};