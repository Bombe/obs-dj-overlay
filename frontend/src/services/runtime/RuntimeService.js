const RuntimeService = ({

    get: () =>
        fetch("/runtime")
            .then(response => response.json())
            .then(json => json.version)

})

export {RuntimeService as default}
