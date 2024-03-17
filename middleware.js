const express = require('express')
const app = express()
const port = 3000

app.use(middleware1)
app.use(middleware2)
app.use(middleware3)


function errHandler(err, req, res, next) {
    if (err) res.send("Sorry there as an err")
}

function middleware1 (req, res, next) {
    res.test = 100
    next()
}

function middleware2 (req, res, next) {

    console.log("I am middlware 2", res.test)
    res.test= 200
    next()
}

function middleware3 (req, res, next) {
    console.log("I am middlware 3", res.test)
    res.test = 300
    next()
}

app.get('/', (req, res, next) => {
    console.log("I am standard express")
    res.send(`This works ${res.test}`)
})

app.get('/test', (rer, res, next) => {
    res.send("This is the test page")
})

app.use(errHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
















