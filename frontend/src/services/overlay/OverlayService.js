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
        fetch("./overlay.json")
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
            .catch(() => defaultOverlayInfo)

}

export {OverlayService}
