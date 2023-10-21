import userEvent from '@testing-library/user-event'

const user = userEvent.setup();

const doNothing = () => {}

export {doNothing, user}
