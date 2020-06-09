module.exports = (app, state) => {

    const overlay = require("./controller.js")(state)

    app.route("/overlay")
        .get(overlay.get)

    app.route("/overlay/show")
        .put(overlay.setShowInfo)

    app.route("/overlay/track")
        .put(overlay.setTrackInfo)

    app.route("/overlay/message")
        .put(overlay.setMessage)

}