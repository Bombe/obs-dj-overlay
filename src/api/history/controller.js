module.exports = history => ({
    get: (request, response) => {
        response.json(history.entries())
    }
})
