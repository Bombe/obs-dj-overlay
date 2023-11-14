const compose = (firstAction, secondAction) => event => {
    firstAction(event)
    secondAction(event)
}

export {compose}
