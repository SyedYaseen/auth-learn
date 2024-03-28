const router = require("express").Router()
const passport = require("passport")
require("dotenv").config()

router.get("/", (req, res, next) => {
  res.send(
    `<a class='button google' href='/auth/google'>Sign in with Google</a>
    ${req.user}
    `
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
  res.send(`Success <br> ${req.user} <a href='/logout'>Logout</a>`)
})

router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err)
    else res.redirect("/")
  })
})
router.get("/auth/google/failure", (req, res, next) => {
  res.send("failure")
})

module.exports = router
