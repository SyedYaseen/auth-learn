const { default: base64url } = require("base64url")
const crypto = require('crypto')
const fs = require('fs')
const signatureFunc = crypto.createSign('RSA-SHA256')

const header = {"alg":"RS256","typ":"JWT"}
const payload = {"sub":"1234567890","name":"John Doe","admin":true,"iat":1516239022}


const headerBase64 = base64url(header)
const paloadBase64 = base64url(payload)


// const JWT = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.NHVaYe26MbtOYhSKkoKYdFVomg4i8ZJd8_-RU8VNbftc4TSMb4bXP3l3YlNWACwyXPGffz5aXHc6lty1Y2t4SWRqGteragsVdZufDn5BlnJl9pdR_kdVFUsra2rWKEofkZeIC4yWytE58sMIihvo9H1ScmmVwBcQP6XETqYd0aSHp1gOa9RdUPDvoXQ5oqygTqVtxaDr6wUFKrKItgBMzWIdNZ6y7O9E0DhEPTbE9rfBo6KTFsHAZnMg4k68CDp2woYIaXbmYTWcvbzIuHO7_37GT79XdIwkm95QJ7hYC9RiwrV7mesbY4PAahERJawntho0my942XheVLmGwLMBkQ'
// const [header, payload, signature] = JWT.split('.').map(item => base64url.decode(item))

// Not working
// const pubkey = fs.readFileSync(__dirname + '/pub_key.pem', "utf-8")
// let buffer = Buffer.from(signature)
// const decryptedSign = crypto.publicDecrypt(pubkey, buffer)

