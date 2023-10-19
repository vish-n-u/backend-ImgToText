require("dotenv").config()
const secretKey = process.env.SECRET_KEY
console.log("secret key",secretKey)
module.exports = {secretKey};