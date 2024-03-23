const crypto = require("crypto")

function encryptWithPublicKey(publicKey, message) {
  const bufferMessage = Buffer.from(message, "utf-8")
  return crypto.publicEncrypt(publicKey, bufferMessage)
}

function encryptWithPrivateKey(privatekey, message) {
  const bufferMessage = Buffer.from(message, "utf-8")
  return crypto.privateEncrypt(privatekey, bufferMessage)
}
module.exports.encryptWithPublicKey = encryptWithPublicKey
module.exports.encryptWithPrivateKey = encryptWithPrivateKey
