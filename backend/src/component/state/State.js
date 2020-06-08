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

const currentState = {...defaultState}

exports.currentState = currentState