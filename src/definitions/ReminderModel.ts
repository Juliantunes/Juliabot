import mongoose from "mongoose";

let reminderSchema = new mongoose.Schema({
    userId: String, 
    timeStamp: Number, 
    event: String,
    channel: String
})

export const Reminder = mongoose.model('Reminder', reminderSchema);