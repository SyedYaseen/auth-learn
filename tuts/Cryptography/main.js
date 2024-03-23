const fs = require("fs")
const encrypt = require("./encrpyt")
const { decryptWithPrivateKey } = require("./decrypt")
const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf-8")
const privateKey = fs.readFileSync(__dirname + "/id_rsa_priv.pem")

const encryptedMessage = encrypt.encryptWithPublicKey(
  publicKey,
  "This is a randon message"
)

const decryptedMessage = decryptWithPrivateKey(privateKey, encryptedMessage)

console.log(encryptedMessage.toString())
console.log(decryptedMessage.toString())
