const expect = require("chai").expect
const State = require("../")

describe("State", () => {

    it("should have empty start values", () => {
        expect(State.currentState()).to.eql({
            track: {
                number: 0,
                artist: "",
                title: "",
                direction: "up"
            },
            lastTrack: {
                number: 0,
                artist: "",
                title: ""
            },
            show: {
                title: "",
                subtitle: "",
                nextShow: "",
            },
            message: "",
            twitchUserName: ""
        })
    })

    it("should keep show info when set", () => {
        State.setShowInfo("Title", "Subtitle", "Next")
        expect(State.currentState().show.title).to.equal("Title")
        expect(State.currentState().show.subtitle).to.equal("Subtitle")
        expect(State.currentState().show.nextShow).to.equal("Next")
    })

    it("should keep track info when set", () => {
        State.setTrackInfo(12, "Artist", "Title")
        expect(State.currentState().track.number).to.equal(12)
        expect(State.currentState().track.artist).to.equal("Artist")
        expect(State.currentState().track.title).to.equal("Title")
    })

    it("should reset current track if empty track is set", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(0, "", "")
        const state = State.currentState()
        expect(state.track).to.contain({number: 0, artist: "", title: ""})
    })

    it("should keep message when set", () => {
        State.setMessage("Message")
        expect(State.currentState().message).to.equal("Message")
    })

    it("should keep twitch user name when set", () => {
        State.setTwitchUserName("TwitchUserName")
        expect(State.currentState().twitchUserName).to.equal("TwitchUserName")
    })

})

describe("Track Number Generation", () => {

    it("should increment track number when number is 0", () => {
        State.setTrackInfo(12, "Artist", "Title")
        State.setTrackInfo(0, "Artist 2", "Title 2")
        expect(State.currentState().track.number).to.equal(13)
        expect(State.currentState().track.artist).to.equal("Artist 2")
        expect(State.currentState().track.title).to.equal("Title 2")
    })

})

describe("last track", () => {
    beforeEach(() => {
        State.setTrackInfo()
    })

    it("should be empty after calling setTrack once", () => {
        State.setTrackInfo(1, "A1", "B1")
        const state = State.currentState()
        expect(state.lastTrack).to.be.eql({number: 0, artist: "", title: ""})
    })

    it("should show the first track when adding two tracks", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(2, "A2", "B2")
        const state = State.currentState()
        expect(state.lastTrack).to.be.eql({number: 1, artist: "A1", title: "B1"})
    })

    it("should not update last track if number and artist are the same", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(1, "A1", "B2")
        const state = State.currentState()
        expect(state.lastTrack).to.be.eql({number: 0, artist: "", title: ""})
    })

    it("should not update last track if number and title are the same", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(1, "A2", "B1")
        const state = State.currentState()
        expect(state.lastTrack).to.be.eql({number: 0, artist: "", title: ""})
    })

    it("should not update last track if artist and title are the same", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(2, "A1", "B1")
        const state = State.currentState()
        expect(state.lastTrack).to.be.eql({number: 0, artist: "", title: ""})
    })

    it("should reset last track if empty track is set", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(2, "A2", "B2")
        State.setTrackInfo(0, "", "")
        const state = State.currentState()
        expect(state.lastTrack).to.be.eql({number: 0, artist: "", title: ""})
    })

})
