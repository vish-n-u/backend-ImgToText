const mongoose = require("mongoose")

const imageDataSchema = new mongoose.Schema({
    orignalImage:{
        type:Buffer,
        required: true
    },
    filename:{
        type:String,
        required: true
    },
    textData:{
        type:String,
        required: true
    },
    userId:{
        type:mongoose.SchemaTypes.String,
        required:true,
    }
},{timestamps:true})


module.exports = mongoose.model("ImageData",imageDataSchema)