const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const connection = require("./database")
const { validPassword } = require("../lib/passwordUtils")
const User = connection.models.User
const customFields = {
  usernameField: "uname",
  passwordField: "pw",
}

// callback below is where I would send the result of the
// authentication
const verifyCallback = (username, password, callback) => {
  User.findOne({ username: username })
    .then((user) => {
      if (!user) return callback(null, false)
      const isValid = validPassword(password, user.hash, user.salt)
      if (isValid) return callback(null, user)
      else return callback(null, false)
    })
    .catch((err) => callback(err))
}
const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

/*
Adds User's id to session.

Executed after passport.authenticate is called
Gets the User from Mongo as param (not sure how)), 
then adds the user's (doc) id into session, (i.e.) sends as part of req 
and puts into session collection which is the session store
*/
passport.serializeUser((user, cb) => {
  console.log("Serializer")
  cb(null, user.id)
})

/*
Gets UserId that is added to session

Gets the user id from session,
Finds user from session store
Attaches the user to the request object

*/

passport.deserializeUser((userId, cb) => {
  console.log("De serializer")
  User.findById(userId)
    .then((user) => {
      cb(null, user)
    })
    .catch((err) => cb(err))
})
