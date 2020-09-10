const {expect} = require("chai")
const controller = require("../controller")

describe("The Sources Controller", () => {

    it("should return all current sources on GET /", () => {
        let setBody
        const response = {
            json: body => {
                setBody = body
            }
        }
        controller({
            get: () => ({traktor: []})
        }).get({}, response)
        expect(setBody).to.eql({traktor: []})
    })

})
