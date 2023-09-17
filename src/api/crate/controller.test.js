const {expect} = require("chai")
const createResponseObject = require("../test/response")

describe("The crate controller", () => {

    const crateController = require("./controller")

    let response
    beforeEach(() => {
        response = createResponseObject()
    })

    it("should return all records from the crate", () => {
        const crate = {
            getRecords: () => [{id: "id1", artist: "Artist 1", title: "Title 1", cover: "Cover 1"}, {id: "id2", artist: "Artist 2", title: "Title 2", cover: "Cover 2"}]
        }
        const controller = crateController(crate)
        controller.getRecords({}, response)
        expect(response.setJson()).to.be.deep.eql([{id: "id1", artist: "Artist 1", title: "Title 1", cover: "Cover 1"}, {id: "id2", artist: "Artist 2", title: "Title 2", cover: "Cover 2"}])
    })

    it("should add records if body contains records in valid JSON", () => {
        const addedRecords = []
        const crate = {
            addRecord: (artist, title, cover) => addedRecords.push({artist, title, cover})
        }
        const controller = crateController(crate)
        controller.importRecords({body: [{artist: "Artist 1", title: "Title 1", cover: "Cover 1"}, {artist: "Artist 2", title: "Title 2", cover: "Cover 2"}]}, response)
        expect(addedRecords).to.be.deep.eql([{artist: "Artist 1", title: "Title 1", cover: "Cover 1"}, {artist: "Artist 2", title: "Title 2", cover: "Cover 2"}])
    })

    it("should end request after importing records", () => {
        const controller = crateController({
            addRecord: () => {
            }
        })
        controller.importRecords({body: [{artist: "Artist 1", title: "Title 1", cover: "Cover 1"}, {artist: "Artist 2", title: "Title 2", cover: "Cover 2"}]}, response)
        expect(response.endCalled()).to.be.true
    })

    it("should reset the crate if a request is sent to reset", () => {
        let resetCrate = false
        const crate = {
            reset: () => resetCrate = true
        }
        const controller = crateController(crate)
        controller.reset({}, response)
        expect(resetCrate).to.be.true
    })

    it("should end the request after the crate was reset", () => {
        const controller = crateController({
            reset: () => {
            }
        })
        controller.reset({}, response)
        expect(response.endCalled()).to.be.true
    })

})
