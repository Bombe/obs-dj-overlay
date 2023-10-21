let entries = []

const history = clock => ({
    reset: () => {
        entries = []
    },
    entries: () => entries,
    add: (artist, title) => {
        if ((artist !== '') && (title !== '')) {
            entries.push({artist, title, time: clock.time()})
        }
    },
    amend: (artist, title) => {
        if (entries.length === 0) {
            history(clock).add(artist, title)
        } else {
            entries[entries.length - 1] = {...entries[entries.length - 1], artist, title}
        }
    }
})

module.exports = history
