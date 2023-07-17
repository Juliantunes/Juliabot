import { CacheType, CommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";
import { Subcommand } from "../../../definitions/Command";
import { convertToUnixFromRelativeTime } from "../../../utilities/TimeUtils";

export class Relative implements Subcommand {

    getName(): string {
        return "relative";
    }

    getCommandData(subcommand: SlashCommandSubcommandBuilder): SlashCommandSubcommandBuilder {
        return subcommand
            .setName("relative")
            .setDescription("Remind yourself at a relative time")
            .addStringOption((option) => {
                return option
                    .setName("event")
                    .setDescription("Event to be reminded of")
            })
            .addStringOption((option) => {
                return option
                    .setName("relative")
                    .setDescription("Relative time to be reminded at (Ex: 3 days, 2 hours, 5 minutes)")
            })
    }

    receiver(interaction: CommandInteraction): unknown {
        if(!interaction.isChatInputCommand()) return;

        const event = interaction.options.getString('event')!
        const relative = interaction.options.getString('relative')!

        const unixTimeStamp = convertToUnixFromRelativeTime(relative)

        const ScheduledMessage = setTimeout(() => {
            interaction.reply(event);
          }, unixTimeStamp);

        return ScheduledMessage ;

    }
}