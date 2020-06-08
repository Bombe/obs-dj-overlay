const expect = require("chai").expect
const controller = require("../controller")

describe("“overlay” Controller", () => {

    describe("The GET / method", () => {

        it("should return the current state", () => {
            const stateToServe = {state: 1, to: 2, serve: 3}
            let servedState
            const response = {
                json: (document) => {
                    servedState = document
                }
            }
            controller({currentState: () => stateToServe}).get({}, response)
            expect(servedState).to.eql(stateToServe)
        })

    })

})