module.exports = (state) => ({
    get: (request, response) => response.json(state.currentState()),

    setTrackNumber: (request, response) => {
        if (Number.isFinite(request.body)) {
            state.setTrackNumber(request.body)
        } else {
            response.status(400)
        }
        response.end()
    }

})
