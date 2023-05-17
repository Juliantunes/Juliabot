import Discord, { GatewayIntentBits } from "discord.js";
import { time } from "discord.js";
const cron = require('node-cron')


const client = new Discord.Client({
    intents: [
        GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers
    ]
});

client.on('ready', () => {
    console.log('JuliasBot is online')
});

client.on('messageCreate', message => {
    if (message.content ==='hello') {
        message.reply('Hello, handsome!')
    }
});

//"<!remind> <event> <time(HH:MM)>"
function HMformat(time:string) {
    const regex = /^(1[0-2]|0?[1-9]):([0-5][0-9])(\s?[ap]m)$|^(1[0-2]|0?[1-9])(\s?[ap]m)$/
    return regex.test(time.toLowerCase())
}

//<"!remind> <event> <HH:MM> <date>"
function date(date:string) {
    const regex =  /^(?:(?:\d{1,2}(?:\/\d{1,2}(?:\/(?:\d{2})?\d{2})?)?)|(?:\d{2}(?:\/\d{1,2}(?:\/(?:\d{2})?\d{2})?)?))$/
    return regex.test(date)
}
//"!remind <event> <date MM/DD/YY>"


//"!<remind <event> <relative time format>"
function relativeDate(date:string) {
    const regex = /^[1-9]\d*(?:[dhms][1-9]\d*)+[dhms]$/
    return regex.test(date)
}
function getDaysInMonth(m:number, y:number):number {
    return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
}
function convertYearToUnix(year:number) {
    // Create a new Date object with the specified year, month, and day
    const date = new Date(year, 0, 1);
  
    // Get the Unix timestamp by dividing the date value by 1000 (to convert from milliseconds to seconds)
    const unixTimestamp = Math.floor(date.getTime() / 1000);
  
    return unixTimestamp;
}

function convertDateToUnix(date: string): number {
    // DD/MM/YYYY (MM: [1-12] | DD: [1-MONTH_MAX])
    // DD/MM/YY (YY = 20YY)
    // DD/MM (YYYY = Current year)
    if(date.includes('/')){
        let dateArray = date.split("/")  //["DD", "MM", "YY"]
        let month = parseInt(dateArray[1]) 
        month = (month >= 1 && month <= 12) ? month : -1;
        let year = parseInt(dateArray[2])
        year = (convertYearToUnix(year)>= Date.now()) ? year : -1
        let day = parseInt(dateArray[0])
        day = (day >0 && day <= getDaysInMonth(month, year)) ? day : -1

        const dateObj = new Date(year, month-1, day)
        const unixTimestamp = Math.floor(dateObj.getTime() / 1000)
        return unixTimestamp
    }
    else{
        return -1
    }
}

function convertToUnixFromTime (time:string):number {
    // 5PM = 5:00+12:00
    // 5AM = 5:00
    // 5:08AM/PM
    // 05:08AM/PM
    let hour, minute, amOrPm: "am" | "pm" = "am";
    // Handles 5:00AM/PM and 05:00AM/PM
    if(time.includes(":")){
        // Split into hour and minute
        const [H, M] = time.split(":");
        // Hour will always be a number
        hour = parseInt(H);
       
        // Use our function
        const result = handleAMOrPM(M);
        minute = result.numerizedTimeString;
        amOrPm = result.amOrPm;
    }else{
        minute = 0;

        const result = handleAMOrPM(time);
        hour = result.numerizedTimeString;
        amOrPm = result.amOrPm;
    }

    // Add 12 to the hour if PM time is passed
    if(amOrPm === "pm"){
        hour += 12;
    }

    // Convert to EST
    hour += 4;

    const date = new Date();
    date.setUTCHours(hour);
    date.setUTCMinutes(minute);
    date.setUTCSeconds(0);
    date.setUTCMilliseconds(0);
    return date.getTime();
    //return Math.floor(date.getTime()/1000)
}

function handleAMOrPM(timeString: string) {
    let amOrPm: "am" | "pm" = "am";
    let numerizedTimeString: number = -1;

    // Determine if time is AM or PM (don't need to check for AM because it is always one or the other)
    if(timeString.toLowerCase().includes("pm")){
        amOrPm = "pm";
    }
    // Remove AM/PM from minute and convert to number
    numerizedTimeString = parseInt(
        timeString.toLowerCase()
            .replace("am", "")
            .replace("pm", "")
    );

    return {
        amOrPm, numerizedTimeString
    }
}

/*
    8 days, 7 hours, and 3 minutes
    8 days, 7 hours, 3 minute (.replace("and", ""))
    ["8 days", "7 hours", "3 minutes"] (.split(",").trim())
    [["8", "days"], ["7", "hours"], ["3", "minutes"]] (.split(" "))
    [[8, "days"], [3, "hours"], [3, "minutes"]] (parseInt)

    8 days, and 3 minutes
    8 days, 10 minutes, and 3 hours
    3 hours
    [["3", "hours"]] if(array[0][1].toLowerCase().includes("hour"))

    const a = [[8, "days"], [3, "hours"], [3, "minutes"]]

    for(const individualArray of a){
        // [8, "days"]
        if(indivItem[1].toLowerCase().includes("day")){
            time += 86400
        }else if(indivItem[1].toLowerCase().includes("hour")){

        }else if(indivItem[1].toLowerCase().includes("minute")){
            
        }else if(indivItem[1].toLowerCase().includes("second")){
            
        }
    }

*/
function convertToUnixFromRelativeTime(relativeTime:string) {
    let timeGiven = relativeTime.replace("and", "").trim().split(",");
    let convertedTime = timeGiven.map(item => item.trim().split(' '));

    let secondsToAdd = 0;
    for(const individualArray of convertedTime) {
        if(individualArray[1].toLowerCase().includes('day')){
            secondsToAdd += parseInt(individualArray[0]) * 86400
        }
        else if(individualArray[1].toLowerCase().includes('hour')){
            secondsToAdd += parseInt(individualArray[0]) * 3600
        }
        else if (individualArray[1].toLowerCase().includes('minute')){
            secondsToAdd += parseInt(individualArray[0]) * 60
        }
    }

    return Date.now() + (secondsToAdd * 1000);
}

const sendMessage = (channel: Discord.TextChannel, message:string) => {
    channel.send(message)
}
const scheduleMessage = (time:number, channel:Discord.TextChannel, message: string) =>{
    const currentTime = new Date().getTime()
    const timeToWait = time-currentTime
    setTimeout(() => {
        sendMessage(channel, message)
    }, timeToWait)
}



client.on('messageCreate', message => {
    //split the user input by space and convert it to an array
    if (message.content.startsWith('!remind')) {
        const parts = message.content.split(" ")
        let time:number = -1;
        let event:string = 'empty';
        let channel = message.channel as Discord.TextChannel;

        //"<!remind> <event> <time(HH:MM)>"
        if(HMformat(parts[parts.length-1])){
            event = parts.slice(1,-1).join(' ')
            time = convertToUnixFromTime(parts[parts.length-1])
        } 

        //<"!remind> <event> <HH:MM> <date>"
        if (HMformat(parts[parts.length-2]) && date(parts[parts.length-1])){
            event = parts.slice(1,parts.length-1).join(' ')
            let date = convertDateToUnix(parts[parts.length-1])
            time = convertToUnixFromTime(parts[parts.length-2]) + date
        }


        //<!remind> <event> <tomorrow>  or<!remind> <event> <tomorrow> <HH:MM> 
        if(message.content.includes("tomorrow")){
            let currentTime = Date.now()
            let TwentyFourHours = 24* 60*60*1000
            time = currentTime +TwentyFourHours
            if(HMformat(parts[parts.length-1])) {
                time = convertToUnixFromTime(parts[parts.length-1])+ TwentyFourHours
            }
        }



            //"!remind <event> <date MM/DD/YY>" or  //"!<remind <event> <relative time format>"
        if (date(parts[parts.length - 1]) || relativeDate(parts[parts.length-1]) ){
            event = parts.slice(0, parts.length-1).join(' ')
            if (relativeDate(parts[parts.length-1])){
                time = convertToUnixFromRelativeTime(parts[parts.length-1])
            }
            else{
                let date = convertDateToUnix(parts[parts.length - 1])
                time = convertToUnixFromTime('12:00pm')+ date
            }


            
        }
        if(event === 'empty'){
            //invalid command
            return;
        }

        if(time === -1){
            // Invalid command
            return;
        }

        scheduleMessage(time, channel, event);
        message.reply(`Reminder scheduled for ${(new Date(time)).toLocaleString('en-US', { 
            timeZone: 'America/New_York' 
        })}`);
    }
}) 


client.login('MTEwMzQxNDE2Njc0MTU5ODMyOA.GONSj3.Nv-YYu_QF2TB4sme3YpVWhmdxkgt34jBIBcIk4')