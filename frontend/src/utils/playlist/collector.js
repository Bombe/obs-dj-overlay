const moment = require("moment")

const collector = {
    collect: (historyEntries, from, to) => {
        if (((from === undefined) || (to === undefined)) || moment(to).isBefore(moment(from))) {
            return []
        }
        const entriesInRange = historyEntries.filter(entry => moment(entry.time).isBetween(moment(from), moment(to), "seconds", "[]"))
        const entriesBeforeRange = historyEntries.filter(entry => moment(entry.time).isBefore(moment(from)))
        if (entriesBeforeRange.length !== 0) {
            entriesInRange.unshift(entriesBeforeRange.pop())
        }
        return entriesInRange
    }
}

export {collector}
