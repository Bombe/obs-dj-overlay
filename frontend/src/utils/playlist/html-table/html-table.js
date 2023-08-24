const moment = require("moment")

const htmlTable = {
    export: (playlistEntries, startTime) => {
        const startMoment = moment(startTime)
        return "<table><thead><th>Offset</th><th>Artist</th><th>Track</th></thead><tbody>"+
            playlistEntries
                .map((entry, index) => (index === 0) ? ({...entry, time: startMoment.valueOf()}) : entry)
                .map(entry => `<td>${formatDuration(moment.duration(moment(entry.time).diff(startMoment)))}</td><td>${entry.artist}</td><td>${entry.title}</td>`)
                .map(row => `<tr>${row}</tr>`)
                .join("")
            +"</tbody></table>"
    }
}

const formatNumber = (number) => number.toString().padStart(2, "0")
const formatDuration = (duration) => formatNumber(duration.hours()) + ":" + formatNumber(duration.minutes()) + ":" + formatNumber(duration.seconds())

module.exports = htmlTable
