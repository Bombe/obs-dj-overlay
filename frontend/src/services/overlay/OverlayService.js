const defaultOverlayInfo = {
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
                    subtitle: json.show.subtitle,
                    nextShow: json.show.nextShow
                },
                message: json.message,
                twitchUserName: json.twitchUserName
            }))
            .catch(() => defaultOverlayInfo),

    setShowInfo: (title, subtitle, nextShow) =>
        fetch("/overlay/show", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({title, subtitle, nextShow}), mode: "same-origin"}),

    setTrackInfo: (number, artist, title) =>
        fetch("/overlay/track", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({number, artist, title}), mode: "same-origin"}),

    setMessage: (message) =>
        fetch("/overlay/message", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(message), mode: "same-origin"}),

    setTwitchData: (username) =>
        fetch("/overlay/twitch", {method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify({username}), mode: "same-origin"})
}

export {OverlayService}
