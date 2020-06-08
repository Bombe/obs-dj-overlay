const expect = require("chai").expect
const controller = require("../controller")

describe("“overlay” Controller", () => {

    describe("The get() method", () => {

        it("should return the current state", () => {
            const stateToServe = {track: {number: 1, artist: "Artist", title: "Title"}}
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