const {expect} = require("chai")
const mixcloud = require("../")

const entry1 = {artist: "Artist 1", title: "Title 1", time: 1599551262000} // Di  8 Sep 2020 09:47:42 CEST
const entry2 = {artist: "Artist 2", title: "Title 2", time: 1599551562000} // Di  8 Sep 2020 09:52:42 CEST
const entry3 = {artist: "Artist 3", title: "Title 3", time: 1599552062000} // Di  8 Sep 2020 10:01:02 CEST
const entry4 = {artist: "Artist 4", title: "Title 4", time: 1599553062000} // Di  8 Sep 2020 10:17:42 CEST
const entry5 = {artist: "Artist 5", title: "Title 5", time: 1599556062000} // Di  8 Sep 2020 11:07:42 CEST
const historyEntries = [entry1, entry2, entry3, entry4, entry5]

describe("The Mixcloud Exporter", () => {

    it("should collect nothing for empty history", () => {
        expect(mixcloud.collect(historyEntries)).to.eql([])
    })

    it("should collect nothing if range in invalid", () => {
        expect(mixcloud.collect(historyEntries, undefined, undefined)).to.eql([])
    })

    it("should collect nothing if to is before from", () => {
        expect(mixcloud.collect(historyEntries, "20200908T1100", "20200908T1000")).to.eql([])
    })

    it("should include the first track if before is earlier than the first track", () => {
        expect(mixcloud.collect(historyEntries, "20200908T0900", "20200908T1200")).to.eql(historyEntries)
    })

    it("should include the second track if before is later than the second track", () => {
        expect(mixcloud.collect(historyEntries, "20200908T1000", "20200908T1200")).to.eql([entry2, entry3, entry4, entry5])
    })

    it("should not include the last track if to is earlier", () => {
        expect(mixcloud.collect(historyEntries, "20200908T1000", "20200908T1100")).to.eql([entry2, entry3, entry4])
    })
})
