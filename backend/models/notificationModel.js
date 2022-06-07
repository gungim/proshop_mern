import mongoose from "mongoose";

const notificationSchema = mongoose.Schema({
  message: {
    type: String,
  },
  typeNoti: {
    type: String,
  },
},{
    timestamps:true
});


const Notification = mongoose.Model('Notificationn', notificationSchema)

export default Notification