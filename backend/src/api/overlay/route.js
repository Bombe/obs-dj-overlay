module.exports = (app) => {
    const overlay = require("./controller.js")

    app.route("/overlay")
        .get(overlay.get)

}