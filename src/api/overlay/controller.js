module.exports = (state) => ({
    get: (request, response) => response.json(state.currentState()),

    setShowInfo: (request, response) => {
        if ((typeof request.body.title === "string") && (typeof request.body.subtitle === "string") && (typeof request.body.nextShow === "string")) {
            state.setShowInfo(request.body.title, request.body.subtitle, request.body.nextShow)
        } else {
            response.status(400)
        }
        response.end()
    },

    setTrackInfo: (request, response) => {
        if ((Number.isFinite(request.body.number) || (request.body.number === "")) && (typeof request.body.artist === "string") && (typeof request.body.title === "string")) {
            state.setTrackInfo(request.body.number === "" ? "" : Math.floor(request.body.number), request.body.artist, request.body.title)
        } else {
            response.status(400)
        }
        response.end()
    },

    setTrackNumberDirection: (request, response) => {
        if (request.body === "up") {
            state.setTrackNumberDirection("up")
        } else if (request.body === "down") {
            state.setTrackNumberDirection("down")
        }
        response.end()
    },

    setMessage: (request, response) => {
        if (typeof request.body === "string") {
            state.setMessage(request.body)
        } else {
            response.status(400)
        }
        response.end()
    },

    setTwitch: (request, response) => {
        if (typeof request.body.username === "string") {
            state.setTwitchUserName(request.body.username)
        } else {
            response.status(400)
        }
        response.end()
    }

})
