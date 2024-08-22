const jwt = require('jsonwebtoken')
const Users = require('../schemas/userSchema')

const authenticated = async(req,res,next)=>{
    try {
       const {authorization} = req.headers

       if(authorization){
         const {user}=jwt.verify(authorization,'87yh4HBJ&TT**(&^BVHJHGUGY^&^&%^&')

         if(!user) return res.send({success:false,message:'invalid token'})

         const isExist = await Users.findOne({email:user.email})

         if(!isExist) return res.send({success:false,message:'user not registered'})

         req.user = isExist
         next()
       }
    } catch (error) {
      console.log('error:-',error.message)
    }
}

module.exports = authenticated
