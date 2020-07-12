const express = require("express")
const app = express()
const port = process.env.PORT || 5000
const path = require("path")
const routes = require("./api/overlay/route")
const State = require("./component/state")

app.use(express.json({strict: false}))

routes(app, State)

// Serve any static files
app.use(express.static(path.join(__dirname, "../frontend/build")))

// Handle React routing, return all requests to React app
app.get("*", function (request, response) {
    response.sendFile(path.join(__dirname, "../frontend/build", "index.html"))
})

app.listen(port)
