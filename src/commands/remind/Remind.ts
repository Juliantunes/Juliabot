import { Message, SlashCommandBuilder } from "discord.js";
import { Command } from "../../definitions/Command";
import { CommandInteraction } from "discord.js";

export class Remind implements Command {
    private name: string;
    private commandData: SlashCommandBuilder;

    constructor(){
        this.name = "hello";
        this.commandData = new SlashCommandBuilder();

        this.commandData
            .setName("remind")
            .setDescription("Remind yourself of an event at a later time")
            .addSubcommand((subcommand) => {
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
                    })
            })
            .addSubcommand((subcommand) => {
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
            })
            .addSubcommand((subcommand) => {
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
            })
            .addSubcommand((subcommand) => {
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
            })
    }

    public getName(){
        return this.name;
    }

    public getCommandData(){
        return this.commandData;
    }

    public receiver(interaction: CommandInteraction){
        interaction.reply('Hello, handsome!')
    }
}