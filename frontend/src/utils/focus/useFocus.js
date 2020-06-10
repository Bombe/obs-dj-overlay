import {useRef} from "react"

/* shamelessly stolen from https://stackoverflow.com/a/54159564/43582 */
const useFocus = () => {
    const htmlElementRef = useRef()
    return [htmlElementRef, () => htmlElementRef.current && htmlElementRef.current.focus()]
}

export {useFocus}