let entries = []

const history = clock => ({
    reset: () => {
        entries = []
    },
    entries: () => entries,
    add: (artist, title) => {
        entries.push({artist, title, time: clock.time()})
    }
})

module.exports = history
