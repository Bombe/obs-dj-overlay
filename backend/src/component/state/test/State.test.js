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

})