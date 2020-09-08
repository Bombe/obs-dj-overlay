const {expect} = require("chai")
const controller = require("../controller")

describe("The History Controller", () => {

    let endCalled
    const response = {
        end: () => {
            endCalled = true
        }
    }

    beforeEach(() => {
        endCalled = false
    })

    it("should return all history entries", () => {
        const historyComponent = {
            entries: () => [{artist: "A1", title: "T1", time: 123}, {artist: "A2", title: "T2", time: 125}]
        }
        let body
        const response = {
            json: (j) => {
                body = j
            }
        }
        controller(historyComponent).get({}, response)
        expect(body).to.eql([{artist: "A1", title: "T1", time: 123}, {artist: "A2", title: "T2", time: 125}])
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
        expect(endCalled).to.be.true
    })

})
