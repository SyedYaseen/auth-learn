const express = require("express")
const session = require("express-session")
let passport = require("passport")
let routes = require("./routes")
const MongoStore = require("connect-mongo")
// This line pulls the app.use statement inside that passport config file
// and makes it accessible here
require("./config/passport")

require("dotenv").config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const sessionStore = MongoStore.create({
  mongoUrl: process.env.DB_STRING,
  collection: "sessions",
})

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      /*
       maxAge: 1000 * 60 * 60 *24 // 1 day
       maxAge: 1000 * 10 // 1 day
      */
      maxAge: 1000 * 60 * 30, // 30 min
    },
  })
)

/*
  Best to initialize the passport middleware each time we are going
  into a route. The session might expire or since we would be using multiple routes
  we want to reinitialize this middleware each time.

  Process:
  1. Check if user is logged in by checking in the session (session.passport.user)
  2. Deserialize and get user id and check if its found in db
  3. Attach the user to the request
*/
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  console.log("***************", req.path, "*****************")
  console.log(req.sessionID)
  console.log(req.session)
  console.log(req.user)
  console.log("----------END----------")

  next()
})

app.use(routes)

app.listen(4000)
