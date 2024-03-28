require("dotenv").config()
const GoogleStrategy = require("passport-google-oauth2").Strategy
const passport = require("passport")
const User = require("mongoose").model("User")

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
    console.log(accessToken, refreshToken, profile)
    User.findOne({ googleId: profile.id })
      .then((user) => {
        if (!user) {
          let user = new User()
          user.googleId = profile.id
          user.save()
          return done(null, user)
        } else return done(null, user)
      })
      .catch((err) => {
        done(err, false)
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
