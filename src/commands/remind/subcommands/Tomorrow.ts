import { time } from "discord.js"
import { HMformat } from "../../../utilities/TimeUtils"
import { convertToUnixFromTime } from "../../../utilities/TimeUtils"
import { scheduleMessage } from "../../../utilities/TimeUtils"
import { Message, TextChannel} from "discord.js";


export class Tomorrow {

    static handle(message:Message, event:string, time?: string){
        let TwentyFourHours = 24* 60*60*1000
        if(time == null){
            let currentTime = Date.now()
            let newTime = currentTime +TwentyFourHours
            scheduleMessage(newTime, message.channel, event)
            message.reply(`Reminder scheduled for ${(new Date(newTime)).toLocaleString('en-US', { 
                timeZone: 'America/New_York' 
            })}`)
        }
        else {
            let newTime = convertToUnixFromTime(time)+ TwentyFourHours
            scheduleMessage(newTime, message.channel, event)
            message.reply(`Reminder scheduled for ${(new Date(newTime)).toLocaleString('en-US', { 
                timeZone: 'America/New_York' 
            })}`)
            }  
        }
    }
