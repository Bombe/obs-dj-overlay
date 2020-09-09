const {expect} = require("chai")
const sources = require("../")

describe("Sources", () => {

    const socket = {}

    beforeEach(() => {
        sources.reset()
    })

    it("should list a Traktor source when a Traktor connection was created", () => {
        sources.addTraktorSource(socket)
        expect(sources.get()).to.have.property("traktor")
        expect(sources.get().traktor).to.be.an("array")
        expect(sources.get().traktor).to.not.be.empty
        expect(sources.get().traktor[0]).to.contain({socket})
    })

    it("should assign an ID to a Traktor source", () => {
        sources.addTraktorSource(socket)
        expect(sources.get().traktor[0].id).to.not.be.equal(undefined)
        expect(sources.get().traktor[0].id).to.not.be.equal("")
    })

    it("should add a readable name to a Traktor source", () => {
        socket.remoteAddress = "1.2.3.4"
        sources.addTraktorSource(socket)
        expect(sources.get().traktor[0].name).to.be.eql("1.2.3.4")
    })

    it("should remove a Traktor connection identified by its socket", () => {
        const secondSocket = { id: "test"}
        sources.addTraktorSource(secondSocket)
        sources.addTraktorSource(socket)
        sources.removeTraktorSource(secondSocket)
        expect(sources.get().traktor).to.have.length(1)
        expect(sources.get().traktor[0].socket).to.be.equal(socket)
    })

    it("should remove a Traktor source identified by its UUID", () => {
        sources.addTraktorSource(socket)
        sources.addTraktorSource(socket)
        let traktorSources = sources.get().traktor
        sources.removeTraktorSource(traktorSources[0].id)
        expect(sources.get().traktor).to.have.length(1)
        expect(sources.get().traktor[0].id).to.be.equal(traktorSources[1].id)
    })

})
