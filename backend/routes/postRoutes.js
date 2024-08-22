const Router = require("express")();
const upload = require("../middlewares/multer");
const Posts = require("../schemas/postSchema");
const Users = require("../schemas/userSchema");
const path = require('path')


Router.post('/createpost',upload.single('file'),async(req,res)=>{
  try {
     const {caption} = req.body;
     const user = JSON.parse(req.body.user)
     
     const isexistuser = await Users.findOne({email: user.email})
     if(!isexistuser) return res.send({success:false,message:'user not found'});

     const filename = req.file.filename
     const fileUrl = path.join(filename)

     const postt = await new Posts({
      user:isexistuser,
      posturl:fileUrl,
      userid:user._id,
      caption
     }).save()

     return res.send({success:true, message:'Post created successfully'})
  } catch (error) {
    console.log('error:- ',error.message)
  }
})

Router.get('/getallpostsofuser/:userid',async(req,res)=>{
  try {
    const {userid} = req.params

    const posts = await Posts.find({userid: userid}).sort({createdAt: -1})

    return res.send({success:true, message:'Post found successfully',posts})
  } catch (error) {
    console.log('error:- ',error.message) 
  }
})

module.exports = Router
