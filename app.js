const express = require('express')
const session = require('express-session')
let passport = require('passport')
let crypto = require('crypto')
let routes = require('./routes');
const connection = require('./config/database');

const MongoStore = require('connect-mongo')
require('dotenv').config();
const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: true}))

const sessionStore = MongoStore.create({
    mongoUrl: process.env.DB_STRING,
    collection: 'sessions'
})

app.use(session({
    secret: process.env.SECRET,
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

app.use(routes)


app.listen(4000)



// From code

// // Package documentation - https://www.npmjs.com/package/connect-mongo
// const MongoStore = require('connect-mongo')(session);

// // Need to require the entire Passport config module so app.js knows about it
// require('./config/passport');

// /**
//  * -------------- GENERAL SETUP ----------------
//  */

// // Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
// require('dotenv').config();

// // Create the Express application
// var app = express();

// app.use(express.json());
// app.use(express.urlencoded({extended: true}));


// /**
//  * -------------- SESSION SETUP ----------------
//  */

// // TODO

// /**
//  * -------------- PASSPORT AUTHENTICATION ----------------
//  */

// app.use(passport.initialize());
// app.use(passport.session());


// /**
//  * -------------- ROUTES ----------------
//  */

// // Imports all of the routes from ./routes/index.js
// app.use(routes);


// /**
//  * -------------- SERVER ----------------
//  */

// // Server listens on http://localhost:3000
// app.listen(3000);