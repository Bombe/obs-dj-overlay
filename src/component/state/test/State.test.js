const expect = require("chai").expect
const State = require("../")

describe("State", () => {

    it("should have empty start values", () => {
        expect(State.currentState()).to.eql({
            track: {
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

    it("should keep message when set", () => {
        State.setMessage("Message")
        expect(State.currentState().message).to.equal("Message")
    })

    it("should keep twitch user name when set", () => {
        State.setTwitchUserName("TwitchUserName")
        expect(State.currentState().twitchUserName).to.equal("TwitchUserName")
    })

})