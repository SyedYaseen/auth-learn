require("dotenv").config()
const express = require("express")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")

require("dotenv").config()
let routes = require("./routes")
require("./user")
require("./passport")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_STRING,
  collection: "sessions",
})

app.use(
  session({
    secret: "some secret",
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      // maxAge: 1000 * 60 * 60 *24 // 1 day
      // maxAge: 1000 * 10 // 1 day
      maxAge: 1000 * 60 * 30, // 30 min
    },
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(routes)
app.listen(3000)
