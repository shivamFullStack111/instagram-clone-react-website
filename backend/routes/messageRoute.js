const express = require("express");
const Messages = require("../schemas/messagesSchema");
const Conversations = require("../schemas/conversationSchema");
const multer = require("multer");
const { uploadVideo } = require("./helpers/videoUploader");
const app = express();
const Router = express.Router();

Router.post('/create-message',async(req,res)=>{
  try {
    const newmessage = await new Messages(req.body).save()
    return res.send({success:true,message:newmessage});
  } catch (error) {
    
  }
})

Router.post('/get-messages', async (req, res) => {
  try {
    const messages =await Messages.find({conversationid:req.body.conversationid})
    await Conversations.findOneAndUpdate({_id:req.body.conversationid,"notificationdata.userid":req.body.userid},{$set:{"notificationdata.$.numberofnotification":0}})
    res.send({success:true,messages})
  } catch (error) {
     console.log(error.message)
  }
  })

  const uploader = multer({
    storage:multer.diskStorage({}),
    limits:{fileSize:10*1025*1024}
  })

  Router.post('/create-message-video',uploader.single('video'),async(req,res)=>{
     try {
      if(!req.file){
        return res.send({success:false,message:'failed to send'})
      }

      const uploadedVideo = await uploadVideo(req.file.path)

      console.log(uploadedVideo.secure_url)

      const {conversationid,senderid,receiverid,type,isgroupchat} = req.body
     const newmessage =  await new Messages({
        conversationid,
        senderid,
        receiverid,
        type,
        isgroupchat,
        url:uploadedVideo.secure_url,
      }).save()

      // if(uploadVideo.secure_url){
        return res.send({success:true,messagee:'video send successfully',message:newmessage})
      // }
     } catch (error) {
      console.log(error.messagee)
     }
  })

module.exports =Router
