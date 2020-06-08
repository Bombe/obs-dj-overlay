const express = require("express")
const app = express()
const port = process.env.PORT || 5001
const routes = require("./api/overlay/route")
const State = require("./component/state")

routes(app, State)

app.listen(port)