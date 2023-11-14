const onEscape = actionWithEvent => event => {
    if (event.key === 'Escape') {
        actionWithEvent(event)
    }
}

export {onEscape}
