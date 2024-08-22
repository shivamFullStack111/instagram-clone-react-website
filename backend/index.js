const express = require('express')
const app = express()
const cors=require('cors')
const mongoose = require('mongoose')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const notificationRouter = require('./routes/notificationRoutes')
const conversationRouter = require('./routes/conversationRoute')
const messageRouter = require('./routes/messageRoute')

app.use(cors())
app.use(express.json())
app.use(express.static("./uploads"))

app.use(userRouter)
app.use(postRouter)
app.use(notificationRouter)
app.use(conversationRouter)
app.use(messageRouter)

main()
function main() {
   mongoose.connect('mongodb://localhost:27017/instagram').then(()=>{
    console.log('db connected')
   })
}

app.listen(8000,()=>{
  console.log('port running on 8000')
})


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const {Server} =require('socket.io')
const Conversations = require('./schemas/conversationSchema')


const io = new Server(1000,{
  cors:{
    origin: 'http://localhost:5173'
  }
})

let activeUsers =[]

const setactiveusers = (userr,socketid)=>{

  activeUsers = [...activeUsers,{...userr,socketid}]
  console.log(activeUsers.length)
}

const removeuser=(socketid)=>{
 activeUsers = activeUsers.filter(userr=>userr.socketid!==socketid)
 console.log(activeUsers.length)
}

io.on('connection',(socket)=>{

  socket.on('addUser',(user)=>{
    const isexist = activeUsers.find(userr=>user._id===userr._id)
    if(!isexist) {
      setactiveusers(user,socket.id)
      io.emit('activeUsers',activeUsers)
    }
  })

  socket.on('disconnect',()=>{
    removeuser(socket.id)
    io.emit('activeUsers',activeUsers)
  })

  socket.on('message',async(message)=>{
     const ussr = activeUsers.find(user=>user._id===message.receiverid)
     
     let convrsation = await Conversations.findOne({members:{$all:[message.senderid,message.receiverid]}})
   
    //  if(!ussr){
      const convrsationn = await Conversations.findOneAndUpdate({'notificationdata.userid':message.receiverid,_id:message.conversationid},{ $inc: { "notificationdata.$.numberofnotification": 1 } },{new:true})
     await convrsationn.save()
    //  }
     convrsation.lastmessage = message.message
     await convrsation.save()

     if(ussr){
      socket.to(ussr.socketid).emit('messageTOFrontend',message)
     }
  })
})



