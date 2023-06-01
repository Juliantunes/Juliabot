import mongoose from "mongoose";
import { CommandHandler } from "../commands/CommandHandler";
import { Client } from "discord.js";
import Discord from "discord.js"
import { TextBasedChannel } from "discord.js";


const reminderSchema = new mongoose.Schema({
    userId : String, 
    timeStamp: Number, 
    event: String
})

export const Reminder = mongoose.model('Reminder', reminderSchema);
