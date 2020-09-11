const {expect} = require("chai")
const version = require("../")

describe("The Version Component", () => {

    it("should return the version from the given file", () => {
        const versionInfo = version("./test/version.json").get()
        expect(versionInfo.hash).to.eql("0cca2ff3e552f827ba5a33708ea22b7e6b82a433")
        expect(versionInfo.name).to.eql("v12-34-g0cca2ff")
    })

    it("should return an empty default version if the file can not be read", () => {
        const versionInfo = version("./test/no-version.json").get()
        expect(versionInfo.hash).to.eql("0")
        expect(versionInfo.name).to.eql("none")
    })

})
