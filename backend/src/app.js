const express = require("express")
const app = express()
const port = process.env.PORT || 5001
const routes = require("./api/overlay/route")

routes(app)

app.listen(port)