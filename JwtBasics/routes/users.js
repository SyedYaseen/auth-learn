const mongoose = require("mongoose")
const router = require("express").Router()
const User = mongoose.model("User")
const passport = require("passport")
const utils = require("../lib/utils")

// TODO
router.get(
  "/protected",
  // passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    console.log(req.headers.authorization)
    res.status(200).json({ success: true, msg: "You are in protected route" })
  }
)

// TODO
router.post("/login", function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: "could not find user" })
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(
        req.body.password,
        user.hash,
        user.salt
      )

      if (isValid) {
        const tokenObject = utils.issueJWT(user)

        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        })
      } else {
        res
          .status(401)
          .json({ success: false, msg: "you entered the wrong password" })
      }
    })
    .catch((err) => {
      next(err)
    })
})

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
