const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const icecastPort = process.env.ICECAST_PORT
const path = require("path")

const overlayRoute = require("./api/overlay/route")
const historyRoute = require("./api/history/route")
const sourceRoute = require("./api/sources/route")
const runtimeRoute = require("./api/runtime/route")
const crateRoute = require("./api/crate/route")
const searchRoute = require('./api/search/route')

const clock = require("./component/clock")
const history = require("./component/history")(clock)
const State = require("./component/state")(history)
const sources = require("./component/sources")
const version = require("./component/version")("../../../version.json")
const crate = require("./component/crate")
const searchService = require('./component/search')

const listenForOggComments = require("./component/icecast/icecast-server")
const {titleCleaner} = require("./component/title-cleaner")

app.use(express.json({strict: false}))
app.use(express.urlencoded({extended: true}))

overlayRoute(app, State)
historyRoute(app, history)
sourceRoute(app, sources)
runtimeRoute(app, version)
crateRoute(app, crate)
searchRoute(app, searchService)

// Serve any static files
app.use(express.static(path.join(__dirname, "../frontend/build")))

// Handle React routing, return all requests to React app
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
})

app.listen(port)

if (icecastPort) {
    listenForOggComments(icecastPort, {
        onTrackData: (e) => {
            const cleanedTitle = titleCleaner(e.artist, e.title)
            if ((cleanedTitle.artist !== "") && (cleanedTitle.title !== "")) {
                State.setTrackInfo(0, cleanedTitle.artist, cleanedTitle.title)
            }
        },
        onTraktorConnect: socket => {
            sources.addTraktorSource(socket)
        },
        onTraktorDisconnect: socket => {
            sources.removeTraktorSource(socket)
        }
    })
}
