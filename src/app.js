const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const path = require("path")
const routes = require("./api/overlay/route")
const State = require("./component/state")
const listenForOggComments = require("./component/icecast/icecast-server")
const {titleCleaner} = require("./component/title-cleaner")

app.use(express.json({strict: false}))

routes(app, State)

// Serve any static files
app.use(express.static(path.join(__dirname, "../frontend/build")))

// Handle React routing, return all requests to React app
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
})

listenForOggComments(8000, {
    onHeader: (e) => {
    },
    onTrackData: (e) => {
        const cleanedTitle = titleCleaner(e.artist, e.title)
        if ((cleanedTitle.artist !== "") && (cleanedTitle.title !== "")) {
            State.setTrackInfo(0, cleanedTitle.artist, cleanedTitle.title)
        }
    }
})
