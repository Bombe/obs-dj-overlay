const onValueEventRun = (action) => (event) => action(event.target.value)

export {onValueEventRun}