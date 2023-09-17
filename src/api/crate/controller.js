const crateController = crate => ({

    getRecords: (request, response) => {
        response.json(crate.getRecords())
    },

    importRecords: (request, response) => {
        request.body.forEach(record => crate.addRecord(record.artist, record.title, record.cover))
        response.end()
    },

    reset: (request, response) => {
        crate.reset()
        response.end()
    }

})

module.exports = crateController
