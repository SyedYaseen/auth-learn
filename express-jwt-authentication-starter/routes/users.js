const mongoose = require("mongoose")
const router = require("express").Router()
const User = mongoose.model("User")
const passport = require("passport")
const utils = require("../lib/utils")

// TODO
router.get("/protected", (req, res, next) => {})

// TODO
router.post("/login", function (req, res, next) {})

// TODO
router.post("/register", function (req, res, next) {
  const { salt, hash } = utils.genPassword(req.body.password)
  console.log("Admin value", req.body.admin)
  const newUser = new User({
    username: req.body.username,
    hash,
    salt,
    admin: req.body.admin === undefined ? false : true,
  })

  newUser
    .save()
    .then((user) => {
      const { token, expires } = utils.issueJWT(user)
      res.json({ success: true, user, token, expires })
    })
    .catch((err) => next(err))

  //   res.redirect("/login")
})

module.exports = router
