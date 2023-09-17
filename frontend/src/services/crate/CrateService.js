const CrateService = {

    getRecords: () =>
        fetch("/crate"),

    importRecords: string =>
        fetch("/crate/import", {method: 'POST', headers: { 'Content-Type': 'application/json' }, body: string}),

    reset: () =>
        fetch("/crate/reset", {method: "DELETE", headers: {"Content-Type": "application/json"}, mode: "same-origin"})

}

export {CrateService}
