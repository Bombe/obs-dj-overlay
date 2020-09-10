const controller = sources => ({

    get: (_, response) => {
        response.json(sources.get())
    }

})

module.exports = controller
