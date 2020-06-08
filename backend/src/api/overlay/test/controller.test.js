const expect = require("chai").expect
const controller = require("../controller")

const nothing = ({})

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

    describe("The PUT /track/number method", () => {

        it("should set the number in the state", () => {
            const trackNumber = Math.floor(Math.random() * 99) + 1
            let setNumber
            controller({setTrackNumber: (trackNumber) => setNumber = trackNumber})
                .setTrackNumber({body: trackNumber}, {end: () => nothing})
            expect(setNumber).to.equal(trackNumber)
        })

        it("ends the request correctly", () => {
            let endCalled = false
            controller({setTrackNumber: () => nothing})
                .setTrackNumber({body: 0}, {end: () => endCalled = true})
            expect(endCalled).to.equal(true)
        })

        it("does not change the track if non-numeric", () => {
            let trackChanged = false
            controller({setTrackNumber: () => trackChanged = true})
                .setTrackNumber({body: "test"}, {status: () => nothing, end: () => nothing})
            expect(trackChanged).to.equal(false)
        })

        it("sets an error status if track is non-numeric", () => {
            let setError
            controller({})
                .setTrackNumber({body: "test"}, {status: (status) => setError = status, end: () => nothing})
            expect(setError).to.equal(400)
        })

        it("ends the request correctly if track is non-numeric", () => {
            let endCalled = false
            controller({setTrackNumber: () => nothing})
                .setTrackNumber({body: "test"}, {status: () => nothing, end: () => endCalled = true})
            expect(endCalled).to.equal(true)
        })

    })

})