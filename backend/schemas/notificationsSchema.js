const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    type: String,
    senderid: String,
    receiverid: String,
  },
  { timestamps: true }
);

const Notifications = mongoose.model("Notifications", notificationSchema);

module.exports = Notifications;
//k
