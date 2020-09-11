const {expect} = require("chai")
const controller = require("../controller")
const createResponseObject = require("../../test/response")

describe("The Sources Controller", () => {

    let response
    beforeEach(() => {
        response = createResponseObject()
    })

    it("should return all current sources on GET /", () => {
        controller({
            get: () => ({traktor: []})
        }).get({}, response)
        expect(response.setJson()).to.eql({traktor: []})
    })

})
