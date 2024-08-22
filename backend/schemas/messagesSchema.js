const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  conversationid: String,
  message: String,
  senderid: String,
  receiverid: String,
  type: String,
  isgroupchat: Boolean,
  url:String
},{timestamps:true});

const Messages = mongoose.model('Messages',messageSchema)

module.exports=Messages
