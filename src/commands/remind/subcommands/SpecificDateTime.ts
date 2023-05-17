import { convertDateToUnix } from "../../../utilities/TimeUtils";
import { convertToUnixFromTime } from "../../../utilities/TimeUtils";
import { sendMessage } from "../../../utilities/TimeUtils";
import { scheduleMessage } from "../../../utilities/TimeUtils";
import { Message, TextChannel } from "discord.js";

export class SpecificDateTime {
    static handle(message:Message, event:string, date:string, time:string){
        let newDate = convertDateToUnix(date)
        const currentDay = new Date();
        currentDay.setMilliseconds(0);
        currentDay.setSeconds(0);
        currentDay.setMinutes(0);
        currentDay.setHours(0);
        let newTime = convertToUnixFromTime(time) - currentDay.getTime();
        const timeToWait = newTime + newDate;
        
        scheduleMessage(timeToWait, message.channel, event)
        message.reply(`Reminder scheduled for ${(new Date(timeToWait)).toLocaleString('en-US', { 
            timeZone: 'America/New_York' 
        })}`)
    }
}