require("dotenv").config()
const GoogleStrategy = require("passport-google-oauth2").Strategy
const passport = require("passport")
var db = require("./db")

const options = {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: `http://localhost:3000${process.env.CALLBACK_URL}`,
  passReqToCallback: true,
}

passport.use(
  new GoogleStrategy(options, function (
    request,
    accessToken,
    refreshToken,
    profile,
    done
  ) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(err)
      return done(err, user)
    })
  })
)

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.username, name: user.name })
  })
})

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user)
  })
})
