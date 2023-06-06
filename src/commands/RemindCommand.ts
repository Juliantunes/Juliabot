import { SlashCommandBuilder, EmbedBuilder } from "discord.js";
import { Reminder } from "../definitions/ReminderModel";
import { convertDateToUnix, convertToUnixFromTime, convertToUnixFromRelativeTime } from "../utilities/TimeUtils";
import { SpecificTime } from "./remind/subcommands/SpecificTime";



module.exports= {
    data: new SlashCommandBuilder()
	.setName('Remind')
	.setDescription('Reminds you of an event at a specified time')
	.addSubcommand(subcommand =>
		subcommand.setName('reminder')
			.setDescription('The reminder')
   
	.addStringOption(option =>
		option
			.setName('event')
			.setDescription('event')
            .setRequired(true))
	.addIntegerOption(option =>
		option
			.setName('specific date/time')
			.setDescription('Remind at a specific date/time')
            .setRequired(false)
    )
    .addIntegerOption(option =>
		option
			.setName('specific time')
			.setDescription('Remind at a specific time')
            .setRequired(false)
    )
    .addStringOption(option =>
		option
			.setName('tomorrow')
			.setDescription('Remind tomorrow')
            .setRequired(false)
    )
    .addIntegerOption(option=>
		option
			.setName('relative time')
			.setDescription('Remind at relative time')
            .setRequired(false)
            
    ))
    async execute(interaction) {
        const {options, guild} = interaction
        const event = options.getString('event')
        const specificDate = options.getInteger('specific date')
        const specificDateTime = options.getInteger('specific date/time') || 0
        const specificTime = options.getInteger('specific time') || 0 
        const tomorrow = options.getString('tomorrow') || 0
        const relativeTime = options.getInteger('relative time') || 0

        let time = null


    if(specificDate){

        time = convertDateToUnix(specificDate)

    } else if(specificDate && specificTime){

        let newDate = convertDateToUnix(specificDateTime)
        const currentDay = new Date();
        currentDay.setMilliseconds(0);
        currentDay.setSeconds(0);
        currentDay.setMinutes(0);
        currentDay.setHours(0);
        let newTime = convertToUnixFromTime(specificTime) - currentDay.getTime();
        time = newTime + newDate;
    
    } else if (specificTime){

        time = convertToUnixFromTime(specificTime)

    } else if (tomorrow ) {

        let TwentyFourHours = 24* 60*60*1000
        let currentTime = Date.now()
        time = currentTime +TwentyFourHours
        
    } else if (tomorrow && specificTime) {
        let TwentyFourHours = 24* 60*60*1000
        time = convertToUnixFromTime(specificTime)+ TwentyFourHours

    } else if (relativeTime) {
        time = convertToUnixFromRelativeTime(relativeTime)
    }



        await Reminder.create({
            userId: interaction.user.id,
            Time:time,
            Event :event
        })



    }
    
            }
    

        



 