module.exports = (app, history) => {

    const controller = require("./controller.js")(history)

    app.route("/history")
        .get(controller.get)

    app.route("/history/reset")
        .put(controller.reset)

}
