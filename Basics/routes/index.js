const router = require("express").Router()
const passport = require("passport")
const passwordUtils = require("../lib/passwordUtils")
const connection = require("../config/database")
const { isAuth, isAdmin } = require("./authMiddleware")
const User = connection.models.User

router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login-failure",
    successRedirect: "login-success",
  })
)

router.post("/register", (req, res, next) => {
  const { salt, hash } = passwordUtils.genPassword(req.body.pw)
  console.log("Admin value", req.body.admin)
  const newUser = new User({
    username: req.body.uname,
    hash,
    salt,
    admin: req.body.admin === undefined ? false : true,
  })

  newUser.save().then((user) => console.log(user))

  res.redirect("/login")
})

router.get("/", (req, res, next) => {
  res.send('<h1>Home</h1><p>Please <a href="/register">register</a></p>')
})

router.get("/login", (req, res, next) => {
  const form =
    '<h1>Login Page</h1><form method="POST" action="/login">\
    Enter Username:<br><input type="text" name="uname">\
    <br>Enter Password:<br><input type="password" name="pw">\
    <br><br><input type="submit" value="Submit"></form>'

  res.send(form)
})

router.get("/register", (req, res, next) => {
  const form =
    '<h1>Register Page</h1><form method="post" action="register">\
                    Enter Username:<br><input type="text" name="uname">\
                    <br>Enter Password:<br><input type="password" name="pw">\
                    <input type="checkbox" name="admin" id="chk-admin value=true>\
                    <label for="chk-admin">Admin</label>\
                    <br><br><input type="submit" value="Submit"></form>'

  res.send(form)
})

/**
 * Lookup how to authenticate users on routes with Local Strategy
 * Google Search: "How to use Express Passport Local Strategy"
 *
 * Also, look up what behaviour express session has without a maxage set
 */
/*
Refactor to below so it checks auth using a middleware
router.get('/protected-route', (req, res, next) => {
    
    // This is how you check if a user is authenticated and protect a route.  You could turn this into a custom middleware to make it less redundant
    if (req.isAuthenticated()) {
        res.send('<h1>You are authenticated</h1><p><a href="/logout">Logout and reload</a></p>');
    } else {
        res.send('<h1>You are not authenticated</h1><p><a href="/login">Login</a></p>');
    }
});
*/

router.get("/protected-route", isAuth, (req, res, next) => {
  res.send("You are a authenticated and on protected route")
})

router.get("/admin-only", isAuth, isAdmin, (req, res, next) => {
  res.send("You are in admin route")
})

// Visiting this route logs the user out
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    res.redirect("/login")
  })
})

router.get("/login-success", (req, res, next) => {
  res.send(
    '<p>You successfully logged in. --> <a href="/protected-route">Go to protected route</a></p>'
  )
})

router.get("/login-failure", (req, res, next) => {
  res.send("You entered the wrong password.")
})

module.exports = router
