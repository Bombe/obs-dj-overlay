const expect = require("chai").expect
const controller = require("../controller")
const createResponseObject = require("../../test/response")

describe("The Runtime Endpoint", () => {

    let response
    beforeEach(() => {
        response = createResponseObject()
    })

    it("should return version information", () => {
        const versionComponent = {get: () => ({hash: "1", name: "test"})}
        controller(versionComponent).get({}, response)
        expect(response.setJson().version).to.eql({hash: "1", name: "test"})
    })

})
