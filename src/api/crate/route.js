module.exports = (app, crate) => {

    const controller = require("./controller.js")(crate)

    app.route("/crate")
        .get(controller.getRecords)

    app.route("/crate/import")
        .post(controller.importRecords)

    app.route("/crate/reset")
        .delete(controller.reset)

}
