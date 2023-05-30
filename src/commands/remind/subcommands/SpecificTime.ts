import { convertToUnixFromTime } from "../../../utilities/TimeUtils"
import { scheduleMessage } from "../../../utilities/TimeUtils"
import { Message, TextChannel } from "discord.js"

export class SpecificTime{
    static handle(message: Message, event: string, time: string){
        let newTime = convertToUnixFromTime(time)
        scheduleMessage(message.author.id,newTime, message.channel, event)
        message.reply(`Reminder scheduled for ${(new Date(newTime)).toLocaleString('en-US', { 
            timeZone: 'America/New_York' 
        })}`)
    }
}