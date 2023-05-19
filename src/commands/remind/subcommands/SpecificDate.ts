import { convertDateToUnix } from "../../../utilities/TimeUtils"
import { sendMessage } from "../../../utilities/TimeUtils"
import { scheduleMessage } from "../../../utilities/TimeUtils"
import { convertToUnixFromTime } from "../../../utilities/TimeUtils"
import { Message, TextChannel, time } from "discord.js";


export class SpecificDate {
   static handle(message: Message, event:string, date:string){
       let targetDate = convertDateToUnix(date)
       let timeToWait = targetDate 

        scheduleMessage(timeToWait, message.channel, event)
       message.reply(`Reminder scheduled for ${(new Date(targetDate)).toLocaleString('en-US', { 
           timeZone: 'America/New_York' 
       })}`)
   }
}
      
