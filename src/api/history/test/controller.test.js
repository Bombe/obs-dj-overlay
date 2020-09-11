const {expect} = require("chai")
const controller = require("../controller")
const createResponseObject = require("../../test/response")

describe("The History Controller", () => {

    let response
    beforeEach(() => {
        response = createResponseObject()
    })

    it("should return all history entries", () => {
        const historyComponent = {
            entries: () => [{artist: "A1", title: "T1", time: 123}, {artist: "A2", title: "T2", time: 125}]
        }
        controller(historyComponent).get({}, response)
        expect(response.setJson()).to.eql([{artist: "A1", title: "T1", time: 123}, {artist: "A2", title: "T2", time: 125}])
    })

    it("should reset the history", () => {
        let resetCalled = false
        const historyComponent = {
            reset: () => {
                resetCalled = true
            }
        }
        controller(historyComponent).reset({}, response)
        expect(resetCalled).to.be.true
    })

    it("should end the request after resetting the history", () => {
        const historyComponent = {
            reset: () => {
            }
        }
        controller(historyComponent).reset({}, response)
        expect(response.endCalled()).to.be.true
    })

})
