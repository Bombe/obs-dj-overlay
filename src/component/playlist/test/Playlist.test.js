const expect = require("chai").expect
const Playlist = require("../")

describe("Playlist", () => {

    beforeEach(() => {
        Playlist.clear()
    })

    it("should start out empty", () => {
        expect(Playlist.get()).to.be.empty
    })

    it("should contain added track", () => {
        Playlist.add("Artist", "Title")
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist", title: "Title"}
        ])
    })

    it("should add new tracks to the end", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 1", title: "Title 1"},
            {track: 1, artist: "Artist 2", title: "Title 2"}
        ])
    })

    it("should insert track at custom position", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        Playlist.insert(1, "Artist 3", "Title 3")
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 1", title: "Title 1"},
            {track: 1, artist: "Artist 3", title: "Title 3"},
            {track: 2, artist: "Artist 2", title: "Title 2"}
        ])
    })

    it("should insert track before first", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        Playlist.insert(0, "Artist 3", "Title 3")
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 3", title: "Title 3"},
            {track: 1, artist: "Artist 1", title: "Title 1"},
            {track: 2, artist: "Artist 2", title: "Title 2"}
        ])
    })

    it("should insert track after last", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        Playlist.insert(2, "Artist 3", "Title 3")
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 1", title: "Title 1"},
            {track: 1, artist: "Artist 2", title: "Title 2"},
            {track: 2, artist: "Artist 3", title: "Title 3"},
        ])
    })

    it("should be empty after clearing", () => {
        Playlist.add("Artist", "Title")
        Playlist.clear()
        expect(Playlist.get()).to.be.empty
    })

    it("should be empty after removing valid index", () => {
        Playlist.add("Artist", "Title")
        Playlist.remove(0)
        expect(Playlist.get()).to.be.empty
    })

    it("should be unmodified after removing invalid index", () => {
        Playlist.add("Artist", "Title")
        Playlist.remove(1)
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist", title: "Title"}
        ])
    })

    it("should move a track up correctly 1", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        Playlist.add("Artist 3", "Title 3")
        Playlist.moveUp(1)
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 2", title: "Title 2"},
            {track: 1, artist: "Artist 1", title: "Title 1"},
            {track: 2, artist: "Artist 3", title: "Title 3"}
        ])
    })

    it("should move a track up correctly 2", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        Playlist.add("Artist 3", "Title 3")
        Playlist.moveUp(2)
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 1", title: "Title 1"},
            {track: 1, artist: "Artist 3", title: "Title 3"},
            {track: 2, artist: "Artist 2", title: "Title 2"}
        ])
    })

    it("should not move up first track", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        Playlist.add("Artist 3", "Title 3")
        Playlist.moveUp(0)
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 1", title: "Title 1"},
            {track: 1, artist: "Artist 2", title: "Title 2"},
            {track: 2, artist: "Artist 3", title: "Title 3"}
        ])
    })

    it("should not move up track after last", () => {
        Playlist.add("Artist 1", "Title 1")
        Playlist.add("Artist 2", "Title 2")
        Playlist.add("Artist 3", "Title 3")
        Playlist.moveUp(3)
        expect(Playlist.get()).to.eql([
            {track: 0, artist: "Artist 1", title: "Title 1"},
            {track: 1, artist: "Artist 2", title: "Title 2"},
            {track: 2, artist: "Artist 3", title: "Title 3"}
        ])
    })

})
