module.exports = (app, version) => {

    const runtimeController = require("./controller")(version)

    app.route("/runtime")
        .get(runtimeController.get)

}
