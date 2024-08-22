const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    members:Array,
    lastmessage:String,
    notificationdata:[
      {
        type:Object,
        userid:{
          type:String,
        },
        numberofnotification:{
           type:String,
        }    
      },
      {
        type:Object,
        userid:{
          type:String,
        },
        numberofnotification:{
           type:String,
        }    
      },
    ],
  },
  { timestamps: true }
);

const Conversations = mongoose.model('Conversations',conversationSchema)

module.exports = Conversations;
