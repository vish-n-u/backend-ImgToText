const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const  {secretKey}  = require("../config/server.config");
const bcrypt = require("bcrypt")
const User = require("../model/user.model");

console.log("secretKey2", secretKey);

exports.registration = async (req, res) => {
  console.log("registration", req.body, secretKey);
  try {
    
    const obj = {
      userName: req.body.userName,
      password: bcrypt.hashSync(req.body.password, 10),
      email: req.body.email,
    };
    const newUser = await User.create(obj);
    let token = jwt.sign({ email: newUser.email }, secretKey);
    newUser.token = token;
    const newObj = {
      userName:newUser.userName,
      email:newUser.email,
      // imageDataId:newUser.imageDataId,
      token:token
    }
    
     console.log("nreUser",newUser)
    return res.status(201).send({
      message:newObj,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ message: "server err" });
  }
};


exports.login = async (req, res) => {
  console.log("enterd login", req.body);

  try {
    let token = jwt.sign({ email: req.doesUserExist.email }, secretKey);
    
       req.doesUserExist
       const newObj = {
        userName:req.doesUserExist.userName,
        email:req.doesUserExist.email,
        imageDataId:req.doesUserExist.imageDataId,
      token:token
      }
    return res.status(200).send({
      message: newObj
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "server err" });
  }
};