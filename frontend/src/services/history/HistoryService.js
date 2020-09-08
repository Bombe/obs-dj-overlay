const HistoryService = {

    entries: () =>
        fetch("/history", {method: "GET", headers: {"Content-Type": "application/json"}, mode: "same-origin"}),

    reset: () =>
        fetch("/history/reset", {method: "PUT", headers: {"Content-Type": "application/json"}, mode: "same-origin"})

}

export {HistoryService}
