import React from "react"
import { TextField } from '@mui/material'

const SelectOnFocusTextField = (props) => {
    return <TextField {...props} onFocus={(event) => event.target.select()}/>
}

export {SelectOnFocusTextField}
