const defaultState = {
    track: {
        number: 0,
        artist: "",
        title: ""
    },
    show: {
        title: "",
        subtitle: ""
    },
    message: "",
    nextShow: "",
    twitchUserName: ""
}

let state = {...defaultState}

module.exports = {
    currentState: () => state,
    setShowInfo: (title, subtitle) => {
        state.show.title = title
        state.show.subtitle = subtitle
    },
    setTrackInfo: (number, artist, title) => {
        state.track.number = number
        state.track.artist = artist
        state.track.title = title
    }
}