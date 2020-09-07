const {expect} = require("chai")
let time = 123
const history = require("../")({time: () => time})

describe("The History Component", () => {

    beforeEach(() => {
        history.reset()
        time = 123
    })

    it("should start out empty", () => {
        expect(history.entries()).to.be.empty
    })

    it("should retain track with current time", () => {
        history.add("Artist", "Title")
        expect(history.entries()).to.eql([{artist: "Artist", title: "Title", time: 123}])
    })

    it("should retain second track with different time", () => {
        history.add("Artist", "Title")
        time = 125
        history.add("Artist 2", "Title 2")
        expect(history.entries()).to.eql([
            {artist: "Artist", title: "Title", time: 123},
            {artist: "Artist 2", title: "Title 2", time: 125}
        ])
    })

    it("should amend last track but not change time", () => {
        history.add("Artist", "Title")
        time = 125
        history.amend("Artist 2", "Title 2")
        expect(history.entries()).to.eql([
            {artist: "Artist 2", title: "Title 2", time: 123}
        ])
    })

    it("should add track if empty history is amended", () => {
        history.amend("Artist 2", "Title 2")
        expect(history.entries()).to.eql([
            {artist: "Artist 2", title: "Title 2", time: 123}
        ])
    })

})
