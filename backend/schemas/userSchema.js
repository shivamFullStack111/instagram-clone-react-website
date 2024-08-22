const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    friends: Array,
    posts: Array,
    profileimage: String,
    bio: String,
    image:String,
    highlights: Array,
    notifications:Array,
    gender:String,
    phonenumber:Number,
    username:{
      type:String,
      default:generateUsername()
    },
  },
  { timestamps: true }
);

function generateUsername() {
  const length = 10;
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let username = '';
  for (let i = 0; i < length; i++) {
      username += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return username;
}

const Users = mongoose.model('Users',userSchema)

module.exports = Users;
