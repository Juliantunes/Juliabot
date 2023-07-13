import { CacheType, CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { Subcommand } from "../../../definitions/Command";

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
        
        return 0;
    }
}