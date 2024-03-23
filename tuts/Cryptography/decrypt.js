const crypto = require("crypto")

function decryptWithPrivateKey(privateKey, encryptedMessage) {
  let bufferMessage = Buffer.from(encryptedMessage)
  return crypto.privateDecrypt(privateKey, bufferMessage)
}

function decryptWithPublicKey(publicKey, encryptedMessage) {
  let bufferMessage = Buffer.from(encryptedMessage)
  return crypto.publicDecrypt(publicKey, bufferMessage)
}

module.exports.decryptWithPrivateKey = decryptWithPrivateKey
module.exports.decryptWithPublicKey = decryptWithPublicKey
