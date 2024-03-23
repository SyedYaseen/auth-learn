const crypto = require("crypto")
const hash = crypto.createHash("sha256")
const fs = require("fs")
const { encryptWithPrivateKey } = require("./encrpyt")

const myData = {
  firstName: "yaseen",
  lastName: "ahamed",
  ppsn: "Never put confidential data in place that we are digitally signing",
}

const jsonData = JSON.stringify(myData)

// Set json val to hash data. This needs to be in string value
hash.update(jsonData)

const hashedData = hash.digest("hex")

const senderPrivateKey = fs.readFileSync(
  __dirname + "/id_rsa_priv.pem",
  "utf-8"
)
const signedMessage = encryptWithPrivateKey(senderPrivateKey, hashedData)

const packageOfDataToSend = {
  algorithm: "sha256",
  originalData: myData,
  signedAndEncryptedData: signedMessage,
}

module.exports.packageOfDataToSend = packageOfDataToSend
