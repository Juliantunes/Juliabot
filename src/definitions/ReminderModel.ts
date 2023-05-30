import mongoose from "mongoose";
import { CommandHandler } from "../commands/CommandHandler";
import { Client } from "discord.js";

const reminderSchema = new mongoose.Schema({
    userId : String, 
    timeStamp: Number, 
    event: String
})

export const Reminder = mongoose.model('Reminder', reminderSchema);
