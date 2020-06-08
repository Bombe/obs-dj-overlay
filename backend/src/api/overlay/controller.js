module.exports = (state) => ({
    get: (request, response) => response.json(state.currentState())
})
