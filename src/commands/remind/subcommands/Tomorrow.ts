import { SlashCommandSubcommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { Subcommand } from "../../../definitions/Command";
import { scheduleMessage } from "../../../utilities/TimeUtils";

export class Tomorrow implements Subcommand{

    getName(): string {
        return "tomorrow";
    }

    getCommandData(subcommand: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder {
        return subcommand
            .setName("tomorrow")
            .setDescription("Remind yourself tomorrow at an optional time")
            .addStringOption((option) => {
                return option
                    .setName("event")
                    .setDescription("Event to be reminded of")
            })
            .addIntegerOption((option) => {
                return option
                    .setName("hour")
                    .setRequired(false)
                    .setDescription("Hour to be reminded at")
            })
            .addIntegerOption((option) => {
                return option
                    .setName("minute")
                    .setRequired(false)
                    .setDescription("Minute to be reminded at")
            });
    }

    receiver(interaction: CommandInteraction): unknown {
        if(!interaction.isChatInputCommand()) {
            return;
        }
        const event = interaction.options.getString("event")!
        const hour = interaction.options.getInteger("hour")
        const minute = interaction.options.getInteger('minute')
        const date = new Date()
        let unixTimeStamp = 0 

        // THIS IS WRONG!
        if (hour && minute) {

        date.setHours(hour);
        date.setMinutes(minute);
        date.setSeconds(0);
        date.setMilliseconds(0)

        unixTimeStamp = Math.floor(date.getTime() / 1000) + 24 *60*60
        

        }

        else {

        date.setDate(date.getDate()+1)
        date.setHours(0,0,0,0)

        unixTimeStamp =  Math.floor(date.getTime() / 1000);


        }
        const ScheduledMessage = setTimeout(() => {
            interaction.reply(event);
          }, unixTimeStamp);

        return ScheduledMessage ;
    }
}