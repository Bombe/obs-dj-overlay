const controller = versionComponent => ({

    get: (_, response) => {
        response.json({
            version: versionComponent.get()
        })
    }

})

module.exports = controller
