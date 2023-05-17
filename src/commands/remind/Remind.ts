import { Message,TextChannel } from "discord.js";
import { Command } from "../../definitions/Command";
import { SpecificTime } from "./subcommands/SpecificTime";
import { SpecificDateTime } from "./subcommands/SpecificDateTime";
import { Tomorrow } from "./subcommands/Tomorrow";
import { RelativeTime } from "./subcommands/RelativeTime";



export class Remind implements Command {
    private name: string;
    
    constructor (){
        this.name  = "remind";
    }

    public getName() {
        return this.name
    }

    //"<!remind> <event> <time(HH:MM)>"
    HMformat(time:string) {
        const regex = /^(1[0-2]|0?[1-9]):([0-5][0-9])(\s?[ap]m)$|^(1[0-2]|0?[1-9])(\s?[ap]m)$/
        return regex.test(time.toLowerCase())
    }

    //"!remind <event> <date MM/DD/YY>"
    date(date:string) {
        const regex =  /^(?:(?:\d{1,2}(?:\/\d{1,2}(?:\/(?:\d{2})?\d{2})?)?)|(?:\d{2}(?:\/\d{1,2}(?:\/(?:\d{2})?\d{2})?)?))$/
        return regex.test(date)
    }

    //"!<remind <event> <relative time format>"
    relativeDate(date:string) {
        const regex = /^\d+[hms]$|^(\d+)\s*hours?\s+and\s+(\d+)\s*minutes?$|^(\d+)\s*h?\s+and\s+(\d+)\s*m?$|^(\d+)\s*h?\s+(\d+)\s*m?$|^(\d+)\s*h?(\d+)\s*m?$/
        return regex.test(date)
    }

    public receiver(message: Message) {
        const parts = message.content.split(" ")
        //"<!remind> <event> <time(HH:MM)>" (specific time)
        if(this.HMformat(parts[parts.length-1])){
            SpecificTime.handle(message, parts.slice(1,-1).join(' '), parts[parts.length-1]);
        } 
        //<"!remind> <event> <HH:MM> <date>" (specific Date/time)
        if (this.HMformat(parts[parts.length-2]) && this.date(parts[parts.length-1])){
            SpecificDateTime.handle(message, parts.slice(1,parts.length-2).join(' '), parts[parts.length-1], parts[parts.length-2])
        }

         //<!remind> <event> <tomorrow>  or <!remind> <event> <tomorrow> <HH:MM> (Tomorrow)
        if(message.content.includes("tomorrow")){
            if(this.HMformat(parts[parts.length-1])) {
                Tomorrow.handle(parts.slice(1, -3).join(" "), parts[parts.length-1])
            }
            else{
                Tomorrow.handle(parts.slice(1, -2).join(" "))
            }
         }

            //"!remind <event> <date MM/DD/YY>" or  //"!<remind <event> <relative time format>" (Relative Time)
        if (this.date(parts[parts.length - 1]) || this.relativeDate(parts[parts.length-1])) {
            if (this.relativeDate(parts[parts.length-1])){
                RelativeTime.handle(parts.slice(1, -1).join(' '), parts[parts.length-1])
            }
            else{
                RelativeTime.handle(parts.slice(1,-1).join(' '),(parts[parts.length-1]))
            }
        }
    }
}