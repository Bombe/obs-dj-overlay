const expect = require("chai").expect
const controller = require("../controller")

const nothing = ({})

const createResponseObject = () => {
    let setStatus = -1
    let endCalled = false
    return {
        status: (s) => setStatus = s,
        end: () => endCalled = true,
        setStatus: () => setStatus,
        endCalled: () => endCalled
    }
}

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

    describe("The PUT /show method", () => {

        let response
        beforeEach(() => {
            response = createResponseObject()
        })

        it("should update both title and subtitle", () => {
            let showTitle, showSubtitle
            controller({
                setShowInfo: (s, t) => {
                    showTitle = s
                    showSubtitle = t
                }
            }).setShowInfo({body: {title: "Title", subtitle: "Subtitle"}}, response)
            expect(showTitle).to.equal("Title")
            expect(showSubtitle).to.equal("Subtitle")
        })

        it("ends the request correctly", () => {
            controller({setShowInfo: (s, t) => nothing})
                .setShowInfo({body: {title: "Title", subtitle: "Subtitle"}}, response)
            expect(response.endCalled()).to.equal(true)
        })

        it("should not update title and subtitle if title is unset", () => {
            let setShowInfoCalled = false
            controller({
                setShowInfo: (s, t) => setShowInfoCalled = true
            }).setShowInfo({body: {subtitle: "Subtitle"}}, response)
            expect(setShowInfoCalled).to.equal(false)
        })

        it("should not update title and subtitle if subtitle is unset", () => {
            let setShowInfoCalled = false
            controller({
                setShowInfo: (s, t) => setShowInfoCalled = true
            }).setShowInfo({body: {title: "Title"}}, response)
            expect(setShowInfoCalled).to.equal(false)
        })

        it("should return a 400 if title is unset", () => {
            controller({setShowInfo: (s, t) => nothing})
                .setShowInfo({body: {subtitle: "Subtitle"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should return a 400 if subtitle is unset", () => {
            controller({setShowInfo: (s, t) => nothing})
                .setShowInfo({body: {title: "Title"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should update both title and subtitle if they are empty strings", () => {
            let showTitle, showSubtitle
            controller({
                setShowInfo: (s, t) => {
                    showTitle = s
                    showSubtitle = t
                }
            }).setShowInfo({body: {title: "", subtitle: ""}}, response)
            expect(showTitle).to.equal("")
            expect(showSubtitle).to.equal("")
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