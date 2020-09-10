const SourcesService = {

    get: () =>
        fetch("/sources")
            .then(response => response.json())

}

export {SourcesService as default}
