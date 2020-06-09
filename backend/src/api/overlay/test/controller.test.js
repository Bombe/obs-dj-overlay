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

})