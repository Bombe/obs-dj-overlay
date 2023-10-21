import userEvent from '@testing-library/user-event'

const user = userEvent.setup()

const doNothing = () => {
}

const contextCapture = () => {
    let providedValue
    const storeProvidedValue = value => {
        providedValue = value
        return <></>
    }
    return {value: () => providedValue, capture: storeProvidedValue}
}

export {contextCapture, doNothing, user}
