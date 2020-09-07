const {expect} = require("chai")
const controller = require("../controller")

describe("The History Controller", () => {

    it("should return all history entries", () => {
        const historyComponent = {
            entries: () => [{artist: "A1", title: "T1", time: 123}, {artist: "A2", title: "T2", time: 125}]
        }
        let body
        const response = {
            json: (j) => {
                body = j
            }
        }
        controller(historyComponent).get({}, response)
        expect(body).to.eql([{artist: "A1", title: "T1", time: 123}, {artist: "A2", title: "T2", time: 125}])
    })

})
