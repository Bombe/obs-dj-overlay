const moment = require("moment")

const mixcloud = {
    export: (playlistEntries, startTime) => {
        const startMoment = moment(startTime)
        return playlistEntries
            .map((entry, index) => (index === 0) ? ({...entry, time: startMoment.valueOf()}) : entry)
            .map(entry => `${formatDuration(moment.duration(moment(entry.time).diff(startMoment)))} ${entry.artist} - ${entry.title}`)
            .join("\n")
    }
}

const formatNumber = (number) => number.toString().padStart(2, "0")
const formatDuration = (duration) => formatNumber(duration.hours()) + ":" + formatNumber(duration.minutes()) + ":" + formatNumber(duration.seconds())

export {mixcloud}
