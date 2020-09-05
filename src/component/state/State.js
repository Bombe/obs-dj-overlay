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

module.exports = {
    currentState: () => ({...state, lastTrack: {number: lastTrack.number || 0, artist: lastTrack.artist || "", title: lastTrack.title || ""}}),
    setShowInfo: (title, subtitle, nextShow) => {
        state.show.title = title
        state.show.subtitle = subtitle
        state.show.nextShow = nextShow
    },
    setTrackInfo: (number = 0, artist = "", title = "") => {
        const numberOfChanges = (number === currentTrack.number ? 0 : 1) + (artist === currentTrack.artist ? 0 : 1) + (title === currentTrack.title ? 0 : 1)
        if ((number === 0) && (artist === "") && (title === "")) {
            lastTrack = {}
            currentTrack = {}
        } else if (numberOfChanges > 1) {
            lastTrack = currentTrack
            if ((number === 0) && (state.track.number !== 0)) {
                if (state.track.direction === "up") {
                    number = state.track.number + 1
                } else {
                    number = state.track.number - 1
                }
            }
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
        currentTrack = {}
    },
    setMessage: (message) => {
        state.message = message
    },
    setTwitchUserName: (twitchUserName) => {
        state.twitchUserName = twitchUserName
    }
}
