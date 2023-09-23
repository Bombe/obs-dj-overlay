const searchController = (searchService) => ({

    search: (request, response) => {
        searchService.search(request.body.q)
            .then(results => {
                response.json(results)
            })
    }

})

module.exports = searchController
