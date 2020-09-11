const RuntimeService = ({

    get: () =>
        fetch("/runtime")
            .then(response => response.json())

})

export {RuntimeService as default}
