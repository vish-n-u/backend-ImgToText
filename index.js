const express = require("express")

const app = express()
const mongoose = require('mongoose')
const DB_URL = require("./config/db.config.js");
const cors = require("cors")



app.use(cors());
app.use(express.json()); 
  app.get("/",(req,res)=>{
      res.status(200).send("reached")
  })
 

  
  async function connectDb() {
    const conn = await mongoose.connect(DB_URL);
    const db = mongoose.connection;
    db.on("error", () => {
      console.log("#### Error while connecting to mongoDB ####");
    });
    db.once("open", () => {
      console.log("#### Connected to mongoDB ####");
    });
      require("./route/auth.route.js")(app)
      require("./route/imgData.route.js")(app)
   
  
    app.listen("5000", () => {
      console.log("listening...");
    });
  }

  connectDb()