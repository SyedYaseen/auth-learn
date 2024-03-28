const mongoose = require("mongoose")

require("dotenv").config()

mongoose.connect(process.env.DB_STRING)

const UserSchema = new mongoose.Schema({
  googleId: String,
  username: String,
  hash: String,
  salt: String,
})

mongoose.model("User", UserSchema)
