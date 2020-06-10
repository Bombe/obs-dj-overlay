const onEnter = (actionWithEvent, preventDefault) => (event) => {
    if (event.key === "Enter") {
        actionWithEvent(event)
        if (preventDefault) {
            event.preventDefault()
        }
    }
}

export {onEnter}