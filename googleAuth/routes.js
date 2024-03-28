const router = require("express").Router()
const passport = require("passport")
require("dotenv").config()

router.get("/", (req, res, next) => {
  res.send(
    "<a class='button google' href='/auth/google'>Sign in with Google</a>"
  )
})

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
)

router.get(
  process.env.CALLBACK_URL,
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
)

router.get("/auth/google/success", (req, res, next) => {
  res.send("Success")
})

router.get("/auth/google/failure", (req, res, next) => {
  res.send("failure")
})

module.exports = router
