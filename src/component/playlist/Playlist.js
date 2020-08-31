let playlist = []

module.exports = {
    clear: () => {
        playlist = []
    },
    get: () =>
        playlist.map((value, index) =>
            ({track: index, artist: value.artist, title: value.title})
        ),
    add: (artist, title) => {
        playlist.push({artist, title})
    },
    insert: (index, artist, title) => {
        playlist.splice(index, 0, {artist, title})
    },
    remove: (toRemove) => {
        if (playlist[toRemove] !== undefined) {
            playlist = playlist.filter((_, index) => index !== toRemove)
        }
    },
    moveUp: (toMove) => {
        if ((toMove > 0) && (toMove < playlist.length)) {
            const oldAtPosition = playlist[toMove - 1]
            playlist[toMove - 1] = playlist[toMove]
            playlist[toMove] = oldAtPosition
        }
    }
}
