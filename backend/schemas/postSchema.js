const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    user:Object,
    posturl:String,
    userid:String,
    caption:String,
    numberoflikes:Number,
    wholikes:Array,
    whocomments:Array,
    numberofcomments:Number,
    shares:Number
  },
  { timestamps: true }
);


const Posts = mongoose.model('Posts',postSchema)

module.exports = Posts;
