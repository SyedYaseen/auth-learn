const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const connection = require('./database');
const { validPassword } = require('../lib/passwordUtils');
const User = connection.models.User;
const customFields = {
    usernameField: 'uname',
    passwordField: 'pw'
};

// callback below is where I would send the result of the 
// authentication
const verifyCallback = (username, password, callback) => {
    User.findOne({username: username})
        .then(user => {
            if (!user) return callback(null, false)
            const isValid = validPassword(password, user.hash, user.salt)
            if(isValid) 
                return callback(null, user)
            else 
                return callback(null, false)
        }).catch(err => callback(err))

}
const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy);

passport.serializeUser((user, cb) => {
    cb(null, user.id)
})

passport.deserializeUser((userId, cb) => {
    User.findById(userId).then(user => {
        console.log(user);
        cb(null, user)
    }).catch(err => cb(err))
})