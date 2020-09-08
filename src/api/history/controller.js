module.exports = history => ({
    get: (request, response) => {
        response.json(history.entries())
    },
    reset: (request, response) => {
        history.reset()
        response.end()
    }
})
