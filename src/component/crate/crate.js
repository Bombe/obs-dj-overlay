
const records = []

const crate = {

    getRecords: () => records.map((record, index) => ({...record, index})),

    addRecord: (artist, title, cover) => {
        records.push({artist, title, cover})
    },

    reset: () => {
        records.length = 0
    }

}

module.exports = crate
