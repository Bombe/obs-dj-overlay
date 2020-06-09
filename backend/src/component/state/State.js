const defaultState = {
    track: {
        number: 0,
        artist: "",
        title: ""
    },
    show: {
        title: "",
        subtitle: "",
        nextShow: ""
    },
    message: "",
    twitchUserName: ""
}

let state = {...defaultState}

module.exports = {
    currentState: () => state,
    setShowInfo: (title, subtitle, nextShow) => {
        state.show.title = title
        state.show.subtitle = subtitle
        state.show.nextShow = nextShow
    },
    setTrackInfo: (number, artist, title) => {
        state.track.number = number
        state.track.artist = artist
        state.track.title = title
    },
    setMessage: (message) => {
        state.message = message
    },
    setTwitchUserName: (twitchUserName) => {
        state.twitchUserName = twitchUserName
    }
}