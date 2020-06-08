const {State} = require("../../component/state")

exports.get = (request, response) => {
    response.json(State)
}
