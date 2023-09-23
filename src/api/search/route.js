module.exports = (app, searchService) => {

    const searchController = require('./controller')(searchService)

    app.route("/search/track")
        .post(searchController.search)

}
