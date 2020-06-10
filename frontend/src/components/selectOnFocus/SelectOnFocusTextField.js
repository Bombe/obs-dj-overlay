import React from "react"
import TextField from "@material-ui/core/TextField"

const SelectOnFocusTextField = (props) => {
    return <TextField {...props} onFocus={(event) => event.target.select()}/>
}

export {SelectOnFocusTextField}