const {expect} = require("chai")
const clock = require("../")

describe("The Clock", () => {

    it("should return the current time", () => {
        const currentTime = Date.now()
        const timeOfClock = clock.time()
        expect(Math.abs(currentTime - timeOfClock)).to.be.lessThan(100)
    })

})
