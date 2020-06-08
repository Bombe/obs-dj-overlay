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
    currentState: () => state
}