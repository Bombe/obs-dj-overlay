import {mixcloud} from '../mixcloud'

const {expect} = require("chai")

const entry2 = {artist: "Artist 2", title: "Title 2", time: 1599551562000} // Di  8 Sep 2020 09:52:42 CEST
const entry3 = {artist: "Artist 3", title: "Title 3", time: 1599552062000} // Di  8 Sep 2020 10:01:02 CEST
const entry4 = {artist: "Artist 4", title: "Title 4", time: 1599553062000} // Di  8 Sep 2020 10:17:42 CEST

describe("The Mixcloud Exporter", () => {

    it("should export the correct playlist if start time is earlier than first track", () => {
        expect(mixcloud.export([entry3, entry4], "20200908T1000")).to.eql("00:00:00 Artist 3 - Title 3\n00:17:42 Artist 4 - Title 4")
    })

    it("should export the correct playlist if start time is later than first track", () => {
        expect(mixcloud.export([entry2, entry3, entry4], "20200908T1000")).to.eql("00:00:00 Artist 2 - Title 2\n00:01:02 Artist 3 - Title 3\n00:17:42 Artist 4 - Title 4")
    })

})
