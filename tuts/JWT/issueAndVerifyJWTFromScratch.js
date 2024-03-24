const { default: base64url } = require("base64url")
const crypto = require('crypto')
const fs = require('fs')
const signatureFunc = crypto.createSign('RSA-SHA256')
const verifyFunc = crypto.createVerify('RSA-SHA256')

/*
    Issuing token
*/

const header = {alg:"RS256",typ:"JWT"}
const payload = {sub:"1234567890",name:"John Doe",admin:true,iat:1516239022}


const headerBase64Url = base64url(JSON.stringify(header))
const payloadBase64Url = base64url(JSON.stringify(payload))

// Hash payload and header
signatureFunc.write(headerBase64Url + '.' + payloadBase64Url)
signatureFunc.end()

// Sign with private key in base64 (different from base64url which we see above on data)
const privKey = fs.readFileSync(__dirname + '/pri_key.pem', "utf-8").split(String.raw`\n`).join('\n')

const signatureBase64 = signatureFunc.sign(privKey, 'base64')
const signatureBase64Url = base64url(signatureBase64)

/* 
    When base64url header, payload and signature are combined we get the JWT
    The one we get above is the same as the JWT we will see below.
    These values (pub, priv key and JWT was taken from RSA256 jwt.io)
*/

// Issue end

/*
    Verify token
*/

const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ'
const [headerB64Url, payloadB64Url, signatureB64Url] = JWT.split('.')
const pubkey = fs.readFileSync(__dirname + '/pub_key.pem', "utf-8")

verifyFunc.write(headerB64Url + '.' + payloadB64Url)
verifyFunc.end()

const jwtSignBase64 = base64url.toBase64(signatureB64Url)
const signatureIsValid = verifyFunc.verify(pubkey, jwtSignBase64, 'base64')
console.log(signatureIsValid);