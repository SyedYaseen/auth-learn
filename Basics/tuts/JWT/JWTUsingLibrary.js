const jwt = require('jsonwebtoken')

const pubkey = fs.readFileSync(__dirname + '/pub_key.pem', "utf-8")
const privKey = fs.readFileSync(__dirname + '/pri_key.pem', "utf-8").split(String.raw`\n`).join('\n')

const payload = {sub:"1234567890",name:"John Doe",admin:true,iat:1516239022}

const signedJwt = jwt.sign(payload, privKey, {algorithm:'RS256'})

jwt.verify(signedJwt, pubkey, {algorithms: ['RS256']}, (err, payload) => {})
