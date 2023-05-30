import { convertToUnixFromRelativeTime } from "../../../utilities/TimeUtils";
import { sendMessage } from "../../../utilities/TimeUtils";
import { scheduleMessage } from "../../../utilities/TimeUtils";
import { Message, TextChannel, time } from "discord.js";


export class RelativeTime {
    static handle(message: Message, event:string, time:string){
        let newTime = convertToUnixFromRelativeTime(time)
        scheduleMessage(message.author.id,newTime, message.channel, event) 

        message.reply(`Reminder scheduled for ${(new Date(newTime)).toLocaleString('en-US', { 
            timeZone: 'America/New_York' 
        })}`)
    }
}