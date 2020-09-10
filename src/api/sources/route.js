module.exports = (app, sources) => {

    const sourcesController = require("./controller.js")(sources)

    app.route("/sources")
        .get(sourcesController.get)

}
