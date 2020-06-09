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
                subtitle: ""
            },
            message: "",
            nextShow: "",
            twitchUserName: ""
        })
    })

    it("should keep show info when set", () => {
        State.setShowInfo("Title", "Subtitle")
        expect(State.currentState().show.title).to.equal("Title")
        expect(State.currentState().show.subtitle).to.equal("Subtitle")
    })

    it("should keep track number when set", () => {
        State.setTrackNumber(123)
        expect(State.currentState().track.number).to.equal(123)
    })

})