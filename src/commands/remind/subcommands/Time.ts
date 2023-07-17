import { CacheType, CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { Subcommand } from "../../../definitions/Command";
import { convertDateToUnix } from "../../../utilities/TimeUtils";

export class Time implements Subcommand {

    getName(): string {
        return "time";
    }

    getCommandData(subcommand: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder {
        return subcommand
            .setName("time")
            .setDescription("Remind yourself at a specific time and/or date")
            .addStringOption((option) => {
                return option
                    .setName("event")
                    .setDescription("Event to be reminded of")
            })
            .addIntegerOption((option) => {
                return option
                    .setName("hour")
                    .setDescription("Hour to be reminded at")
            })
            .addIntegerOption((option) => {
                return option
                    .setName("minute")
                    .setDescription("Minute to be reminded at")
            })
            .addStringOption((option) => {
                return option
                    .setName("date")
                    .setRequired(false)
                    .setDescription("Date to be reminded at (MM/DD/YY)")
            });
    }

    receiver(interaction: CommandInteraction): unknown {
        if(!interaction.isChatInputCommand()) return;

        const event = interaction.options.getString('event')!
        const hour = interaction.options.getInteger('hour')!
        const minute = interaction.options.getInteger('minute')!
        const date = interaction.options.getString('date')
        const newDate = new Date()
        

        if (date !== null) {

            const UnixDate = convertDateToUnix(date)

            newDate.setHours(hour)
            newDate.setMinutes(minute)
            newDate.setSeconds(0)
            newDate.setMilliseconds(0)

            

          

            

            





        }


        



        return 0;
    }
}