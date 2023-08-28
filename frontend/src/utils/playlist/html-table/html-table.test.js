const {expect} = require("chai")
const htmlTable = require("../html-table")

const entry2 = {artist: "Artist 2", title: "Title 2", time: 1599551562000} // Di  8 Sep 2020 09:52:42 CEST
const entry3 = {artist: "Artist 3", title: "Title 3", time: 1599552062000} // Di  8 Sep 2020 10:01:02 CEST
const entry4 = {artist: "Artist 4", title: "Title 4", time: 1599553062000} // Di  8 Sep 2020 10:17:42 CEST

describe("The HTML Table Exporter should", () => {

    it('should always start with a <table> tag, the header section, and a <tbody> tag', () => {
        expect(htmlTable.export([], "20200908T1000")).to.satisfy(v => v.startsWith("<table><thead><th>Offset</th><th>Artist</th><th>Track</th></thead><tbody>"))
    });

    it('should always end with a </tbody> and a </table> tag"', () => {
        expect(htmlTable.export([], "20200908T1000")).to.satisfy(v => v.endsWith("</tbody></table>"))
    });

    it('should set the start time of the first track to the given start time', () => {
        expect(htmlTable.export([entry2, entry3, entry4], "20200908T1000")).to.contain("<td>00:00:00</td><td>Artist 2</td><td>Title 2</td>")
    });

})
