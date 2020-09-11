const createResponseObject = () => {
    let setStatus = -1
    let endCalled = false
    let json = undefined
    return {
        json: (j) => json = j,
        status: (s) => setStatus = s,
        end: () => endCalled = true,
        setJson: () => json,
        setStatus: () => setStatus,
        endCalled: () => endCalled
    }
}

module.exports = createResponseObject
