import { SlashCommandSubcommandBuilder, CommandInteraction, CacheType } from "discord.js";
import { Subcommand } from "../../../definitions/Command";

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
        if(!interaction.isChatInputCommand()) return;
        
        return 0;
    }
}