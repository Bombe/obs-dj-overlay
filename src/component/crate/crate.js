
const records = []

const crate = {

    getRecords: () => records.map((record, index) => ({...record, index})),

    addRecord: (artist, title, cover) => {
        if (!records.some(value => (value.artist === artist) && (value.title === title) && (value.cover === cover))) {
            records.push({artist, title, cover})
        }
    },

    reset: () => {
        records.length = 0
    }

}

module.exports = crate
