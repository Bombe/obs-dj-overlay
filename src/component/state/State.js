const defaultState = {
    track: {
        number: 0,
        artist: "",
        title: "",
        direction: "up"
    },
    lastTrack: {
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
let currentTrack = {}
let lastTrack = {}

module.exports = history => ({
    currentState: () => ({...state, lastTrack: {number: lastTrack.number || 0, artist: lastTrack.artist || "", title: lastTrack.title || ""}}),
    setShowInfo: (title, subtitle, nextShow) => {
        state.show.title = title
        state.show.subtitle = subtitle
        state.show.nextShow = nextShow
    },
    setTrackInfo: (number = 0, artist = "", title = "", amend = false) => {
        if (amend) {
            history.amend(artist, title)
        } else {
            if ((artist !== "") && (title !== "")) {
                if ((number === 0) && (state.track.number !== 0)) {
                    if (state.track.direction === "up") {
                        number = state.track.number + 1
                    } else {
                        number = state.track.number - 1
                    }
                }
            }
            lastTrack = currentTrack
            history.add(artist, title)
        }
        currentTrack = {number, artist, title}
        state.track.number = number
        state.track.artist = artist
        state.track.title = title
    },
    setTrackNumberDirection: (direction = "up") => {
        if (direction === "down") {
            state.track.direction = "down"
        } else {
            state.track.direction = "up"
        }
    },
    resetLastTrack: () => {
        lastTrack = {}
    },
    setMessage: (message) => {
        state.message = message
    },
    setTwitchUserName: (twitchUserName) => {
        state.twitchUserName = twitchUserName
    }
})
