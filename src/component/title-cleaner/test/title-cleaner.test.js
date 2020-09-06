const expect = require("chai").expect
const {titleCleaner} = require("../")

describe("The Title Cleaner", () => {

    it("should treat undefined values as empty strings", () => {
        expect(titleCleaner(undefined, undefined)).to.eql({artist: "", title: ""})
    })

    it("should trim both fields", () => {
        expect(titleCleaner("  artist  ", " title ")).to.eql({artist: "artist", title: "title"})
    })

    it("should remove excessive whitespace from both fields", () => {
        expect(titleCleaner("  Ar   Tist  ", " Ti    Tle ")).to.eql({artist: "Ar Tist", title: "Ti Tle"})
    })

    it("should remove “original mix” from title", () => {
        expect(titleCleaner("artist", "Title (Original Mix)")).to.eql({artist: "artist", title: "Title"})
    })

    it("should not remove a parented expression that is not a mix", () => {
        expect(titleCleaner("artist", "Title (Closer)")).to.eql({artist: "artist", title: "Title (Closer)"})
    })

    it("should not remove a parented expression that is not a mix", () => {
        expect(titleCleaner("artist", "Title (Closer) (Original Mix)")).to.eql({artist: "artist", title: "Title (Closer)"})
    })

    it("should remove “extended mix” from title", () => {
        expect(titleCleaner("artist", "Title (Extended Mix)")).to.eql({artist: "artist", title: "Title"})
    })

    it("should remove “radio mix” from title", () => {
        expect(titleCleaner("artist", "Title (Radio Mix)")).to.eql({artist: "artist", title: "Title"})
    })

    it("should remove “extended” from title but keep the remixer", () => {
        expect(titleCleaner("artist", "Title (Remixer Extended Mix)")).to.eql({artist: "artist", title: "Title (Remixer Mix)"})
    })

    it("should move “feat. Somebody Else” from title to artist", () => {
        expect(titleCleaner("Artist", "Title feat. Somebody Else (Remixer Extended Mix)")).to.eql({artist: "Artist feat. Somebody Else", title: "Title (Remixer Mix)"})
    })

    it("should move “(feat. Somebody Else)” from title to artist", () => {
        expect(titleCleaner("Artist", "Title (feat. Somebody Else) (Remixer Extended Mix)")).to.eql({artist: "Artist feat. Somebody Else", title: "Title (Remixer Mix)"})
    })

    it("should move “ft Somebody Else” from title to artist", () => {
        expect(titleCleaner("Artist", "Title ft Somebody Else (Remixer Extended Mix)")).to.eql({artist: "Artist feat. Somebody Else", title: "Title (Remixer Mix)"})
    })
})
