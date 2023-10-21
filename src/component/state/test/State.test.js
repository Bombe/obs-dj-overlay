const expect = require("chai").expect
const nullHistory = {
    add: () => {
    },
    amend: () => {
    }
}
const State = require("../")(nullHistory)

describe("State", () => {

    it("should have empty start values", () => {
        expect(State.currentState()).to.eql({
            track: {
                number: 0,
                cover: "",
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
        State.setTrackInfo(12, "Artist", "Title", false, "Cover")
        expect(State.currentState().track.number).to.equal(12)
        expect(State.currentState().track.artist).to.equal("Artist")
        expect(State.currentState().track.title).to.equal("Title")
        expect(State.currentState().track.cover).to.equal("Cover")
    })

    it("should reset cover if not explicitely set", () => {
        State.setTrackInfo(12, "Artist", "Title", false, "Cover")
        State.setTrackInfo(0, "Artist 2", "Title 2", false)
        expect(State.currentState().track.artist).to.equal("Artist 2")
        expect(State.currentState().track.title).to.equal("Title 2")
        expect(State.currentState().track.cover).to.equal("")
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
    beforeEach(() => {
        State.setTrackInfo()
        State.setTrackNumberDirection("up")
    })

    it("should increment track number when number is 0", () => {
        State.setTrackInfo(12, "Artist", "Title")
        State.setTrackInfo(0, "Artist 2", "Title 2")
        expect(State.currentState().track.number).to.equal(13)
        expect(State.currentState().track.artist).to.equal("Artist 2")
        expect(State.currentState().track.title).to.equal("Title 2")
    })

    it("should decrement track number when track number is 0", () => {
        State.setTrackInfo(12, "Artist", "Title")
        State.setTrackNumberDirection("down")
        State.setTrackInfo(0, "Artist 2", "Title 2")
        expect(State.currentState().track.number).to.equal(11)
    })

    it("should not change the track number if it is 0", () => {
        State.setTrackInfo(0, "Artist", "Title")
        State.setTrackInfo(0, "Artist 2", "Title 2")
        expect(State.currentState().track.number).to.equal(0)
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

    it("should not change last track if track is amended", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(2, "A2", "B2")
        State.setTrackInfo(2, "A3", "B3", true)
        const state = State.currentState()
        expect(state.lastTrack).to.be.deep.equal({number: 1, artist: "A1", title: "B1"})
    })

    it("should reset last track if reset function is called", () => {
        State.setTrackInfo(1, "A1", "B1")
        State.setTrackInfo(2, "A2", "B2")
        State.resetLastTrack()
        const state = State.currentState()
        expect(state.lastTrack).to.be.deep.equal({number: 0, artist: "", title: ""})
    })

})

describe("The History", () => {

    const fakeHistory = {}
    const state = require("../")(fakeHistory)
    let setArtist
    let setTitle
    let amendedArtist
    let amendedTitle

    beforeEach(() => {
        setArtist = undefined
        setTitle = undefined
        amendedArtist = undefined
        amendedTitle = undefined
        fakeHistory.add = (artist, title) => {
            setArtist = artist
            setTitle = title
        }
        fakeHistory.amend = (artist, title) => {
            amendedArtist = artist
            amendedTitle = title
        }
        const state = require("../")(fakeHistory)
    })

    it("should receive track when it’s added", () => {
        state.setTrackInfo(1, "Artist", "Title")
        expect(setArtist).to.eql("Artist")
        expect(setTitle).to.eql("Title")
    })

    it("should amend last entry if the amend flag is set", () => {
        state.setTrackInfo(1, "Atist", "Title")
        state.setTrackInfo(1, "Artist", "Title", true)
        expect(amendedArtist).to.eql("Artist")
        expect(amendedTitle).to.eql("Title")
    })

    it('should not be updated when an empty track was set', () => {
        state.setTrackInfo(0, '', '')
        expect(setArtist).to.be.undefined
        expect(setTitle).to.be.undefined
    })

})
