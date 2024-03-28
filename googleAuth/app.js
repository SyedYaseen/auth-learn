const express = require("express")
const passport = require("passport")
require("dotenv").config()
let routes = require("./routes")
require("./passport")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize())

app.use(routes)
app.listen(3000)
