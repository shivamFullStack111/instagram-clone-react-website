const Notifications = require("../schemas/notificationsSchema");
const Users = require("../schemas/userSchema");

const Router = require("express")();

Router.post('/sendnotification',async(req,res)=>{
  try {
    const notification =await new Notifications(req.body).save()

    return res.send({success: true, message: 'notification send successfully'})
  } catch (error) {
    
  }
})

Router.post('/getnotification',async(req,res)=>{
  try {
    const notification = await Notifications.findOne({senderid:req.body.senderid,receiverid:req.body.receiverid,type:req.body.type})

    return res.send({success:true,notification})
  } catch (error) {
    
  }
})
 Router.post('/cancelRequest',async(req,res)=>{
    try {
      await Notifications.findOneAndDelete({senderid:req.body.senderid,receiverid:req.body.receiverid,type:req.body.type})
      return res.send({success:true,message:'request canceled'})
    } catch (error) {
      
    }
 })

 Router.post('/getNotificationsofuser',async(req, res)=>{
  try {
    const notifications = await Notifications.find({receiverid:req.body.userid,type:req.body.type})

    return res.send({success:true,notifications})
  } catch (error) {
    
  }
 })

 Router.post('/acceptrequest',async (req, res) => {
  try {
    const user = await Users.findOne({_id:req.body.receiverid});
    user.friends=[...user.friends,req.body.senderid]
    

    const senderuser = await Users.findOne({_id:req.body.senderid});
    senderuser.friends=[...senderuser.friends,req.body.receiverid]

    await senderuser.save();
    await user.save();

     return res.send({success: true,message:'request accepted'})

  } catch (error) {
    
  }
 })


module.exports = Router
