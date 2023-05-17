import Discord, { GatewayIntentBits } from "discord.js";


export function convertToUnixFromTime (time:string):number {
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

export function handleAMOrPM(timeString: string) {
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

export function getDaysInMonth(m:number, y:number):number {
    return m===2 ? y & 3 || !(y%25) && y & 15 ? 28 : 29 : 30 + (m+(m>>3)&1);
}

export function convertDateToUnix(date: string): number {
    // MM/DD/YYYY (MM: [1-12] | DD: [1-MONTH_MAX])
    // MM/DD/YY (YY = 20YY)
    // MM/DD (YYYY = Current year)
    if(date.includes('/')){
        let dateArray = date.split("/")  //["MM", "DD", "YY"]
        let month = parseInt(dateArray[0]) 
        month = (month >= 1 && month <= 12) ? month : -1;

        let year = parseInt(dateArray[2])
        if(year < (new Date()).getFullYear()) return -1;

        let day = parseInt(dateArray[1])
        day = (day >0 && day <= getDaysInMonth(month, year)) ? day : -1

        const dateObj = new Date(year, month-1, day)
        const unixTimestamp = dateObj.getTime()
        return unixTimestamp
    }
    else{
        return -1
    }
}









export const sendMessage = (channel: Discord.TextBasedChannel, message:string) => {
    channel.send(message)
}

export const scheduleMessage = (time:number, channel:Discord.TextBasedChannel, message: string) =>{
    const currentTime = new Date().getTime()
    const timeToWait = time-currentTime
    setTimeout(() => {
        sendMessage(channel, message)
    }, timeToWait)
}