const expect = require("chai").expect
const controller = require("../controller")
const createResponseObject = require("../../test/response")

const nothing = ({})

describe("“overlay” Controller", () => {

    let response
    beforeEach(() => {
        response = createResponseObject()
    })

    describe("The GET / method", () => {

        it("should return the current state", () => {
            const stateToServe = {state: 1, to: 2, serve: 3}
            controller({currentState: () => stateToServe}).get({}, response)
            expect(response.setJson()).to.eql(stateToServe)
        })

    })

    describe("The PUT /show method", () => {

        it("should update show information", () => {
            let showTitle, showSubtitle, nextShow
            controller({
                setShowInfo: (s, t, n) => {
                    showTitle = s
                    showSubtitle = t
                    nextShow = n
                }
            }).setShowInfo({body: {title: "Title", subtitle: "Subtitle", nextShow: "Next"}}, response)
            expect(showTitle).to.equal("Title")
            expect(showSubtitle).to.equal("Subtitle")
            expect(nextShow).to.equal("Next")
        })

        it("ends the request correctly", () => {
            controller({setShowInfo: (s, t, n) => nothing})
                .setShowInfo({body: {title: "Title", subtitle: "Subtitle", nextShow: "Next"}}, response)
            expect(response.endCalled()).to.equal(true)
        })

        it("should not update show information if title is unset", () => {
            let setShowInfoCalled = false
            controller({
                setShowInfo: () => setShowInfoCalled = true
            }).setShowInfo({body: {subtitle: "Subtitle", nextShow: "Next"}}, response)
            expect(setShowInfoCalled).to.equal(false)
        })

        it("should not update show information if subtitle is unset", () => {
            let setShowInfoCalled = false
            controller({
                setShowInfo: () => setShowInfoCalled = true
            }).setShowInfo({body: {title: "Title", nextShow: "Next"}}, response)
            expect(setShowInfoCalled).to.equal(false)
        })

        it("should not update show information if next show is unset", () => {
            let setShowInfoCalled = false
            controller({
                setShowInfo: () => setShowInfoCalled = true
            }).setShowInfo({body: {title: "Title", subtitle: "Subtitle"}}, response)
            expect(setShowInfoCalled).to.equal(false)
        })

        it("should return a 400 if title is unset", () => {
            controller({setShowInfo: () => nothing})
                .setShowInfo({body: {subtitle: "Subtitle", nextShow: "Next"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should return a 400 if subtitle is unset", () => {
            controller({setShowInfo: () => nothing})
                .setShowInfo({body: {title: "Title", nextShow: "Next"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should return a 400 if next show is unset", () => {
            controller({setShowInfo: () => nothing})
                .setShowInfo({body: {title: "Title", subtitle: "Subtitle"}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should update show information if all strings are empty", () => {
            let showTitle, showSubtitle, nextShow
            controller({
                setShowInfo: (s, t, n) => {
                    showTitle = s
                    showSubtitle = t
                    nextShow = n
                }
            }).setShowInfo({body: {title: "", subtitle: "", nextShow: ""}}, response)
            expect(showTitle).to.equal("")
            expect(showSubtitle).to.equal("")
            expect(nextShow).to.equal("")
        })

    })

    describe("The PUT /track method", () => {

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

        it("should forward number, artist, title, and amend flag to state", () => {
            let parameters = {}
            controller({setTrackInfo: (number, artist, title, amend) => parameters = {number, artist, title, amend}})
                .setTrackInfo({body: {number: 1, artist: "Artist", title: "Title", amend: true}}, response)
            expect(parameters).to.be.deep.equal({number: 1, artist: "Artist", title: "Title", amend: true})
        })

        it("should should normalize a missing amend flag to false", () => {
            let amendFlag
            controller({setTrackInfo: (number, artist, title, amend) => amendFlag = amend})
                .setTrackInfo({body: {number: 1, artist: "Artist", title: "Title"}}, response)
            expect(amendFlag).to.be.false
        })

        it("should should normalize a non-zero, non-empty amend flag to true", () => {
            let amendFlag
            controller({setTrackInfo: (number, artist, title, amend) => amendFlag = amend})
                .setTrackInfo({body: {number: 1, artist: "Artist", title: "Title", amend: "17"}}, response)
            expect(amendFlag).to.be.true
        })
    })

    describe("The PUT /trackNumberDirection method", () => {

        it("should set the track direction to up if “up” was sent", () => {
            let setDirection
            controller({
                setTrackNumberDirection: (direction) => {
                    setDirection = direction
                }
            }).setTrackNumberDirection({body: "up"}, response)
            expect(setDirection).to.equal("up")
        })

        it("should end request if “up” was sent", () => {
            controller({setTrackNumberDirection: () => nothing}).setTrackNumberDirection({body: "up"}, response)
            expect(response.endCalled()).to.be.true
        })

        it("should set the track direction to down if “down” was sent", () => {
            let setDirection
            controller({
                setTrackNumberDirection: (direction) => {
                    setDirection = direction
                }
            }).setTrackNumberDirection({body: "down"}, response)
            expect(setDirection).to.equal("down")
        })

        it("should end request if “down” was sent", () => {
            controller({setTrackNumberDirection: () => nothing}).setTrackNumberDirection({body: "down"}, response)
            expect(response.endCalled()).to.be.true
        })

        it("should not set the track direction if something else was sent", () => {
            let directionSet = false
            controller({
                setTrackNumberDirection: (direction) => {
                    directionSet = true
                }
            }).setTrackNumberDirection({body: "something else"}, response)
            expect(directionSet).to.be.false
        })


        it("should end request if something else was sent", () => {
            controller({setTrackNumberDirection: () => nothing}).setTrackNumberDirection({body: "something else"}, response)
            expect(response.endCalled()).to.be.true
        })

    })

    describe("The PUT /message method", () => {

        it("should update the message", () => {
            let setMessage
            controller({setMessage: (m) => setMessage = m})
                .setMessage({body: "Message"}, response)
            expect(setMessage).to.equal("Message")
        })

        it("should end the request if message is set", () => {
            controller({setMessage: () => nothing})
                .setMessage({body: "Message"}, response)
            expect(response.endCalled()).to.equal(true)
        })

        it("should not set the message if message is missing", () => {
            let setMessageCalled = false
            controller({setMessage: () => setMessageCalled = true})
                .setMessage({}, response)
            expect(setMessageCalled).to.equal(false)
        })

        it("should return 400 if the message is missing", () => {
            controller({setMessage: () => nothing})
                .setMessage({}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should end the request if message is missing", () => {
            controller({setMessage: () => nothing})
                .setMessage({}, response)
            expect(response.endCalled()).to.equal(true)
        })

    })

    describe("The PUT /twitch method", () => {

        beforeEach(() => {
            response = createResponseObject()
        })

        it("should update the Twitch username", () => {
            let setTwitchUserName
            controller({setTwitchUserName: (t) => setTwitchUserName = t})
                .setTwitch({body: {username: "TwitchUserName"}}, response)
            expect(setTwitchUserName).to.equal("TwitchUserName")
        })

        it("should end the request correctly", () => {
            controller({setTwitchUserName: () => nothing})
                .setTwitch({body: {username: "TwitchUserName"}}, response)
            expect(response.endCalled()).to.equal(true)
        })

        it("should not update the Twitch username if username is missing", () => {
            let twitchUserNameCalled = false
            controller({setTwitchUserName: () => twitchUserNameCalled = true})
                .setTwitch({body: {}}, response)
            expect(twitchUserNameCalled).to.equal(false)
        })

        it("should return 400 if username is missing", () => {
            controller({setTwitchUserName: () => nothing})
                .setTwitch({body: {}}, response)
            expect(response.setStatus()).to.equal(400)
        })

        it("should end the request if username is missing", () => {
            controller({setTwitchUserName: () => nothing})
                .setTwitch({body: {}}, response)
            expect(response.endCalled()).to.equal(true)
        })

    })

    describe("The DELETE /lastTrack method", () => {

        it("should reset the last track", () => {
            let lastTrackReset = false
            controller({resetLastTrack: () => lastTrackReset = true})
                .resetLastTrack({}, response)
            expect(lastTrackReset).to.be.true
        })

        it("should end the request correctly", () => {
            controller({resetLastTrack: () => nothing})
                .resetLastTrack({}, response)
            expect(response.endCalled()).to.be.true
        })

    })

})
