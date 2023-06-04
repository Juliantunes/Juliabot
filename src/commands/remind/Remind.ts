import { CommandInteraction, TextChannel } from "discord.js";
import { Command } from "../../definitions/Command";
import { SpecificTime } from "./subcommands/SpecificTime";
import { SpecificDateTime } from "./subcommands/SpecificDateTime";
import { Tomorrow } from "./subcommands/Tomorrow";
import { RelativeTime } from "./subcommands/RelativeTime";
import { SpecificDate } from "./subcommands/SpecificDate";
import { HMformat } from "../../utilities/TimeUtils";
import { commandData } from "../../utilities/RemindData";
export class Remind implements Command {
  private name: string;

  constructor() {
    this.name = "remind";
  }

  public getName() {
    return this.name;
  }

  public receiver(interaction: CommandInteraction) {
    const event = interaction.options.get('event')?.value as string;

    if (event) {
      const timeOption = interaction.options.getString('time');

      // Handle different time options
      if (timeOption === 'hh:mm') {
        // Handle HH:MM format
        const time = interaction.options.getString('time');

        if (time) {
          SpecificTime.handle(interaction, event, time);
        } else {
          // Time option is required, but no value provided
          interaction.reply('Please provide a valid time in HH:MM format.');
        }
      } else if (timeOption === 'yyyy-mm-dd hh:mm') {
        // Handle YYYY-MM-DD HH:MM format
        const time = interaction.options.getString('time');

        if (time) {
          SpecificDateTime.handle(interaction, event, time);
        } else {
          // Time option is required, but no value provided
          interaction.reply('Please provide a valid date and time in YYYY-MM-DD HH:MM format.');
        }
      } else if (timeOption === 'x-hours') {
        // Handle X hours from now format
        // ... handle this format accordingly
      } else {
        // Invalid time option selected
        interaction.reply('Invalid time option selected.');
      }
    } else {
      // Event option is required, but no value provided
      interaction.reply('Please provide an event or task.');
    }
  }
}
