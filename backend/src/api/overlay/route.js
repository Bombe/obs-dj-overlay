module.exports = (app, state) => {

    const overlay = require("./controller.js")(state)

    app.route("/overlay")
        .get(overlay.get)

    app.route("/overlay/track/number")
        .put(overlay.setTrackNumber)

}