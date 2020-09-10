const uuid = require("uuid")

let traktorSources = []

const sources = {

    reset: () => {
        traktorSources = []
    },

    get: () => ({
        traktor: traktorSources
    }),

    addTraktorSource: socket => {
        traktorSources.push({
            id: uuid.v4(),
            name: socket.remoteAddress,
            socket
        })
    },

    removeTraktorSource: socketOrUUID => {
        traktorSources = traktorSources.filter(source => (typeof socketOrUUID === "string") ? source.id !== socketOrUUID : source.socket !== socketOrUUID)
    }

}

module.exports = sources
