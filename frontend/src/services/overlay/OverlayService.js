const defaultOverlayInfo = {
    track: {
        number: 0,
        artist: "",
        title: ""
    },
    show: {
        "title": "",
        "subtitle": ""
    },
    message: "",
    nextShow: "",
    twitchUserName: ""
}

const OverlayService = {

    defaultValue: () => defaultOverlayInfo,

    get: () =>
        fetch("/overlay")
            .then(response => response.json())
            .then(json => ({
                track: {
                    number: json.track.number,
                    artist: json.track.artist,
                    title: json.track.title,
                },
                show: {
                    title: json.show.title,
                    subtitle: json.show.subtitle
                },
                message: json.message,
                nextShow: json.nextShow,
                twitchUserName: json.twitchUserName
            }))
            .catch(() => defaultOverlayInfo),

    setShowInfo: (title, subtitle) =>
        fetch("/overlay/show", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({title, subtitle}), mode: "same-origin"}),

    setTrackInfo: (number, artist, title) =>
        fetch("/overlay/track", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({number, artist, title}), mode: "same-origin"}),

    setMessage: (message) =>
        fetch("/overlay/message", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(message), mode: "same-origin"})
}

export {OverlayService}
