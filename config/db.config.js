require("dotenv").config()


const DB_URL = process.env.DB_URL
console.log("DB_URL: " + DB_URL)
module.exports = DB_URL