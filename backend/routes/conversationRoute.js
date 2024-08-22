const Router = require("express")();
const Conversations = require('../schemas/conversationSchema')

Router.post('/create-conversation',async(req, res)=>{
  try {
    const isExist = await Conversations.findOne({members:{$all:[req.body.user1._id,req.body.user2._id]}})

    if(isExist){
      return res.send({success:true,message:`Conversation already exists`,conversation:isExist})
    }

    const newconversation = await new Conversations({
      members:[req.body.user1._id,req.body.user2._id],
      notificationdata:[
        {
          userid:req.body.user1._id,
          numberofnotification:0,
        },
        {
          userid:req.body.user2._id,
          numberofnotification:0,
        },
      ],
    }).save()

    const conversation = await Conversations.findOne({members:{$all:[req.body.user1._id,req.body.user2._id]}})
    
    return res.send({success:true,message:`new Conversation created`,conversation:conversation})
  } catch (error) {
    
  }
});

Router.post('/get-conversation',async(req,res)=>{
  try {
    // const res = await Conversations.find({members:{$in:[req.body.userid]}})
    const conversations = await Conversations.find({members:req.body.userid})
    return res.send({success:true,conversations})
  } catch (error) {
    
  }
})

module.exports = Router
