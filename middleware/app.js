const express = require('express')
const app = express()
const port = 3000

app.use(middleware1)
app.use(middleware2)

function middleware1 (req, res, next) {
    console.log("I am middleware 1")
    next()
}

function middleware2 (req, res, next) {
    console.log("I am middlware 2")
    next()
}

function middleware3 (req, res, next) {
    console.log("I am middlware 3")
    next()
}

app.get('/', middleware1, (req, res, next) => {
    console.log("I am standard express")
    res.send('This works')
})

app.get('/test', (rer, res, next) => {
    res.send("This is the test page")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
















