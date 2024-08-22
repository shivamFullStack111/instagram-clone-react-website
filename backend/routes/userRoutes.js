const Router = require("express")();
const Users = require("../schemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authenticated = require("../middlewares/Authentication");
const upload = require("../middlewares/multer");
const path = require('path')
const fs = require('fs');

Router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !name || !password)
      return res.send({ success: false, message: "all fields are required" });

    const isexist = await Users.findOne({ email: email });

    if (isexist)
      return res.send({ success: false, message: "Already registered" });

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newuser = await new Users({
      name,email,password:hashpassword
    }).save();

    const thisuser = await Users.findOne({ email: email });

    const token = jwt.sign(
      { user: thisuser },
      "87yh4HBJ&TT**(&^BVHJHGUGY^&^&%^&",
      { expiresIn: "365d" }
    );

    return res.send({
      success: true,
      message: "register successful",
      token: token,
    });
  } catch (error) {
    console.log("error:- ", error.message);
  }
});

Router.post('/login',async(req,res)=>{
  try {
    const {  email, password } = req.body;
    if (!email || !password )
      return res.send({ success: false, message: "all fields are required" });

      const isexist = await Users.findOne({ email: email });
  
      if (!isexist)
        return res.send({ success: false, message: "user not registered" });

        const isCorrectPassword = await bcrypt.compare(password,isexist.password);

        console.log(isCorrectPassword)
        if(!isCorrectPassword) return res.send({ success: false, message: "Incorrect password" });

        const token = jwt.sign(
          { user: isexist },
          "87yh4HBJ&TT**(&^BVHJHGUGY^&^&%^&",
          { expiresIn: "365d" }
        );

        return res.send({ success: true, message:'Login successful',token:token });
    
  } catch (error) {
    console.log('error:- ',error.message);
  }
})

// cheack is authenticated
Router.get('/isauthenticated',authenticated,async(req,res)=>{
  try {
    const userr = await Users.findOne({email: req.user.email})

    if(!userr) return res.send({success: false, message:'user not found'});

    return res.send({success: true, message:'user is authenticated',user:userr});

  } catch (error) {
    console.log('error:-',error.message);
  }
})

Router.post('/updateimage',upload.single('file'),async(req,res)=>{
  try {
    const {email}=req.body

    const isuser = await Users.findOne({email:email})

    if(isuser.image){
      const filename=isuser.image
      const filePath = `uploads/${filename}`
      fs.unlink(filePath,(err)=>{
        if(err){
          console.log(err)
        }
      })
    }

    const filename = req.file.filename
    const fileUrl = path.join((filename))

    isuser.image = fileUrl

    await isuser.save()

    return res.send({success: true,message:'profile image updated successfully'})

  } catch (error) {
    
  }
})

Router.post('/updateprofile',async(req,res)=>{
  try {
    const {name,email,password,bio,username,gender,phonenumber}=req.body
    console.log(1)

    const isUsernameAlreadyExists = await Users.findOne({username: username,email:{$ne: email}})
    if(isUsernameAlreadyExists) return res.send({success:false,message:`Username already exists`})

    console.log(2)
    const userr = await Users.findOne({email: email})
    if(!userr) return res.send({success:false,message:`user not found`})

    await Users.findOneAndUpdate({email:email},req.body)
    
    return res.send({success:true,message:`profile updated successfully`})

  } catch (error) {
    
  }
})

Router.post('/getusers',async(req,res)=>{
  try {
    const {searchvalue,page} = req.body
    const perPage = 7; // Number of records per page
        const skip = (page - 1) * perPage; // Calculate skip value based on page number

        const users = await Users.find({$or: [
          { name: { $regex: searchvalue, $options: 'i' } },
          { username: { $regex: searchvalue, $options: 'i' } }
        ]}).skip(skip).limit(perPage);

        return res.send({success: true, message:'users found',users: users || []});
    
  } catch (error) {
    
  }
})

Router.get('/getuser/:userid',async(req,res)=>{
  try {
    const user = await Users.findOne({_id: req.params.userid});

    return res.send({success: true, user: user});
  } catch (error) {
    
  }
})

Router.post('/getfriendsofuser',async(req, res)=>{
  try {
    const users = await Users.find({friends:{$in:[req.body.user._id]}})
    return res.send({success: true,users:users})
  } catch (error) {
    
  }
})

module.exports = Router;
