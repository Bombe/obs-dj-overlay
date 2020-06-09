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

    describe("The PUT /track method", () => {

        let response
        beforeEach(() => {
            response = createResponseObject()
        })

        it("should update track data", () => {
            let setNumber, setArtist, setTitle
            controller({
                setTrackInfo: (n, a, t) => {
                    setNumber = n
                    setArtist = a
                    setTitle = t
                }
            })
                .setTrackInfo({body: {number: 12, artist: "Artist", title: "Title"}}, response)
            expect(setNumber).to.equal(12)
            expect(setArtist).to.equal("Artist")
            expect(setTitle).to.equal("Title")
        })

        it("should end request after updating", () => {
            controller({setTrackInfo: () => nothing})
                .setTrackInfo({body: {number: 12, artist: "Artist", title: "Title"}}, response)
            expect(response.endCalled()).to.equal(true)
        })

        it("should not update track if number is missing", () => {
            let setTrackInfoCalled = false
            controller({setTrackInfo: () => setTrackInfoCalled = true})
                .setTrackInfo({body: {artist: "Artist", title: "Title"}}, response)
            expect(setTrackInfoCalled).to.equal(false)
        })

        it("should not update track if number is non-numeric", () => {
            let setTrackInfoCalled = false
            controller({setTrackInfo: () => setTrackInfoCalled = true})
                .setTrackInfo({body: {number: "number", artist: "Artist", title: "Title"}}, response)
            expect(setTrackInfoCalled).to.equal(false)
        })

        it("should update track if number is empty", () => {
            let setNumber
            controller({setTrackInfo: (n, a, t) => setNumber = n})
                .setTrackInfo({body: {number: "", artist: "Artist", title: "Title"}}, response)
            expect(setNumber).to.equal("")
        })

        it("should update track with integer number only", () => {
            let setNumber
            controller({setTrackInfo: (n, a, t) => setNumber = n})
                .setTrackInfo({body: {number: 12.3456, artist: "Artist", title: "Title"}}, response)
            expect(setNumber).to.equal(12)
        })

        it("should return 400 if number is number missing", () => {
            controller({setTrackInfo: () => nothing})
                .setTrackInfo({body: {artist: "Artist", title: "Title"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should end request if number is missing", () => {
            controller({setTrackInfo: () => nothing})
                .setTrackInfo({body: {artist: "Artist", title: "Title"}}, response)
            expect(response.endCalled()).to.equal(true)
        })

        it("should not update track info if artist is missing", () => {
            let setTrackInfoCalled = false
            controller({setTrackInfo: () => setTrackInfoCalled = true})
                .setTrackInfo({body: {number: 12, title: "Title"}}, response)
            expect(setTrackInfoCalled).to.equal(false)
        })

        it("should return 400 if artist is missing", () => {
            controller({setTrackInfo: () => nothing})
                .setTrackInfo({body: {number: 12, title: "Title"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should end request if artist is missing", () => {
            controller({setTrackInfo: () => nothing})
                .setTrackInfo({body: {number: 12, title: "Title"}}, response)
            expect(response.endCalled()).to.equal(true)
        })

        it("should not update track info if title is missing", () => {
            let setTrackInfoCalled = false
            controller({setTrackInfo: () => setTrackInfoCalled = true})
                .setTrackInfo({body: {number: 12, artist: "Artist"}}, response)
            expect(setTrackInfoCalled).to.equal(false)
        })

        it("should return 400 if title is missing", () => {
            controller({setTrackInfo: () => nothing})
                .setTrackInfo({body: {number: 12, artist: "Artist"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should end request if title is missing", () => {
            controller({setTrackInfo: () => nothing})
                .setTrackInfo({body: {number: 12, artist: "Artist"}}, response)
            expect(response.endCalled()).to.equal(true)
        })

    })

})