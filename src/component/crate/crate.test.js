const {expect} = require("chai")
const crate = require("./crate")

describe("The Crate Component", () => {

    it("should be empty on start", () => {
        expect(crate.getRecords()).to.be.eql([])
    })

    it("should keep the records added to it", () => {
        crate.addRecord("Artist", "Title", "img:a")
        expect(crate.getRecords()).to.be.eql([{index: 0, artist: "Artist", title: "Title", cover: "img:a"}])
    })

    it("should remove all records on reset", () => {
        crate.addRecord("Artist", "Title", "img:a")
        crate.reset()
        expect(crate.getRecords()).to.be.eql([])
    })

})
