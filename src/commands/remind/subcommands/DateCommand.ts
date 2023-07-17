import { CacheType, CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { Subcommand } from "../../../definitions/Command";
import { convertDateToUnix } from "../../../utilities/TimeUtils";

export class DateCommand implements Subcommand {

    getName(): string {
        return "date";
    }

    getCommandData(subcommand: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder {
        return subcommand
            .setName("date")
            .setDescription("Remind yourself at a specific date")
            .addStringOption((option) => {
                return option
                    .setName("event")
                    .setDescription("Event to be reminded of")
            })
            .addStringOption((option) => {
                return option
                    .setName("date")
                    .setDescription("Date to be reminded at (MM/DD/YY)")
            })
    }

    receiver(interaction: CommandInteraction): unknown {
        
        if(!interaction.isChatInputCommand()) return;

        const event = interaction.options.getString('event')!
        const date = interaction.options.getString('date')!

        const unixTimeStamp = convertDateToUnix(date)

        const ScheduledMessage = setTimeout(() => {
            interaction.reply(event);
          }, unixTimeStamp);

        return ScheduledMessage ;

    }
}