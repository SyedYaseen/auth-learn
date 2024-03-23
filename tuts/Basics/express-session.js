const express = require('express')
const session = require('express-session')

const MongoStore = require('connect-mongo')
const app = express()

const dbString = "mongodb://localhost:27017/auth_db"

app.use(express.json())
app.use(express.urlencoded({extended: true}))

const sessionStore = MongoStore.create({
    mongoUrl: dbString,
    collection: 'sessions'
})

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        // maxAge: 1000 * 60 * 60 *24 // 1 day
        // maxAge: 1000 * 10 // 1 day
        maxAge: 1000 * 60 * 30 // 30 min
    }
}))

app.use(function printSessions(req, res, next) {
    if(req.session.count) req.session.count+=1
    else req.session.count = 1

    next()
})

app.get('/', (req, res, next) => {
    res.send(`Visited this page ${req.session.count}`)
})
app.listen(4000)