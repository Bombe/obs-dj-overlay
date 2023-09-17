const defaultState = {
    track: {
        number: 0,
        cover: "",
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
let currentTrack = defaultState.track
let lastTrack = defaultState.lastTrack

module.exports = history => ({
    currentState: () => ({...state, track: currentTrack, lastTrack: {number: lastTrack.number || 0, artist: lastTrack.artist || "", title: lastTrack.title || ""}}),
    setShowInfo: (title, subtitle, nextShow) => {
        state.show.title = title
        state.show.subtitle = subtitle
        state.show.nextShow = nextShow
    },
    setTrackInfo: (number = 0, artist = "", title = "", amend = false, cover = "") => {
        if (amend) {
            history.amend(artist, title)
        } else {
            if ((artist !== "") && (title !== "")) {
                if ((number === 0) && (currentTrack.number !== 0)) {
                    if (currentTrack.direction === "up") {
                        number = currentTrack.number + 1
                    } else {
                        number = currentTrack.number - 1
                    }
                }
            }
            lastTrack = currentTrack
            history.add(artist, title)
        }
        currentTrack = {...currentTrack, number, cover, artist, title}
    },
    setTrackNumberDirection: (direction = "up") => {
        if (direction === "down") {
            currentTrack.direction = "down"
        } else {
            currentTrack.direction = "up"
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
