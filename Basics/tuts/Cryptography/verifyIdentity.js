const crypto = require("crypto")
const fs = require("fs")
const { decryptWithPublicKey } = require("./decrypt")

//Data from sender
const receviedData = require("./signMessage").packageOfDataToSend

const hash = crypto.createHash(receviedData.algorithm)

const publicKey = fs.readFileSync(__dirname + "/id_rsa_pub.pem", "utf-8")

const decryptedMessage = decryptWithPublicKey(
  publicKey,
  receviedData.signedAndEncryptedData
)

const decryptedMessageHex = decryptedMessage.toString()

hash.update(JSON.stringify(receviedData.originalData))
const hashOfOriginalHex = hash.digest("hex")

if (hashOfOriginalHex === decryptedMessageHex) {
  console.log("NO tampering and data is valid")
} else {
  console.log("Data dont look right")
}
