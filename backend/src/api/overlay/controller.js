module.exports = (state) => ({
    get: (request, response) => response.json(state.currentState()),

    setShowInfo: (request, response) => {
        if (typeof request.body.title === "string" && typeof request.body.subtitle === "string") {
            state.setShowInfo(request.body.title, request.body.subtitle)
        } else {
            response.status(400)
        }
        response.end()
    },

    setTrackNumber: (request, response) => {
        if (Number.isFinite(request.body)) {
            state.setTrackNumber(request.body)
        } else {
            response.status(400)
        }
        response.end()
    }

})
