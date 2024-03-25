const crypto = require('crypto')

// TODO

function generateHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
}

function validPassword(password, hash, salt) {
    return hash === generateHash(password, salt)
}

function genPassword(password) {

    let salt =crypto.randomBytes(32).toString('hex')
    let genHash = generateHash(password, salt)

    return {
        salt: salt,
        hash: genHash
    }
}

module.exports.validPassword = validPassword;
module.exports.genPassword = genPassword;