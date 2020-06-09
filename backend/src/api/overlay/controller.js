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

    setTrackInfo: (request, response) => {
        if ((Number.isFinite(request.body.number) || (request.body.number === '')) && (typeof request.body.artist === "string") && (typeof request.body.title === "string")) {
            state.setTrackInfo(request.body.number === '' ? '' : Math.floor(request.body.number), request.body.artist, request.body.title)
        } else {
            response.status(400)
        }
        response.end()
    }

})
