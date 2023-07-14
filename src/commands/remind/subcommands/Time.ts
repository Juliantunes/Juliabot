import { CacheType, CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { Subcommand } from "../../../definitions/Command";

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



        return 0;
    }
}