const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')

const MongoStore = require('connect-mongo')(session)
const app = express()

const dbString = "mongodb://localhost:27017/auth_db"
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
const connection = mongoose.createConnection(dbString, dbOptions)

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res, next) => {
    res.send("This works")
})
app.listen(3000)