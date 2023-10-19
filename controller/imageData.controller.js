const ImageData = require("../model/imageData.model")
const Tesseract = require("tesseract.js")
const sharp = require("sharp");

exports.createImgData = async(req,res)=>{
    try{
        const preprocessedImageBuffer = await sharp(req.file.buffer)
        .resize({ width: 800 }) // Resize as needed
        .normalize() // Enhance contrast
        .toBuffer();
    const result = await Tesseract.recognize(preprocessedImageBuffer);
console.log("result",result)
    const imgDataObj ={
        filename:req.file.originalname,
        orignalImage:req.file.buffer,
        textData:result.data.text||"null",
        userId:req.user._id
    }
    const newImgData = await ImageData.create(imgDataObj)
    req.user.imageDataId.push({_id:newImgData._id,fileName:newImgData.filename})
        await req.user.save()
    return res.status(201).send({message:newImgData})
}
catch(err){
    console.log(err,"err")
    return res.status(500).send(
        {message:"Internal serv error"}
    )
}
}


exports.returnImgData =async(req,res)=>{
    try{
    const result = await Tesseract.recognize(req.file.buffer);
    const imgDataObj ={
        filename:req.file.originalname,
        orignalImage:req.file.buffer,
        textData:result.data.text
    }

    return res.status(200).send({message:imgDataObj})
}
catch(err){
    console.log(err,"err")
    return res.status(500).send(
        {message:"Internal serv error"}
    )
}

}

exports.getSingleImageData =async(req,res)=>{
    try{
        console.log("id---",req.params.id)
        const imageData = await ImageData.findById(req.params.id)
        return res.status(200).send({message:imageData})
    }
    catch(err){
        console.log(err)
        return res.status(500).send(
            {message:"Internal serv error"}
        )
    }

}