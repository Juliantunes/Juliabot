import { CacheType, Message, SlashCommandBuilder } from "discord.js";
import { Command, SubcommandObject } from "../../definitions/Command";
import { CommandInteraction } from "discord.js";
import { Relative } from "./subcommands/Relative";
import { DateCommand } from "./subcommands/DateCommand";
import { Time } from "./subcommands/Time";
import { Tomorrow } from "./subcommands/Tomorrow";

export class Remind implements Command {
    private name: string;
    private commandData: SlashCommandBuilder;
    private subcommands: SubcommandObject;

    constructor(){
        this.name = "remind";
        this.commandData = new SlashCommandBuilder();
        this.subcommands = {};

        // Add all subcommands to subcommand object
        const relative = new Relative();
        this.subcommands[relative.getName()] = relative;

        const time = new Time();
        this.subcommands[time.getName()] = time;

        const date = new DateCommand();
        this.subcommands[date.getName()] = date;

        const tomorrow = new Tomorrow();
        this.subcommands[tomorrow.getName()] = tomorrow;

        // Load all command and subcommand data
        this.commandData
            .setName("remind")
            .setDescription("Remind yourself of an event at a later time")
            .addSubcommand(relative.getCommandData)
            .addSubcommand(time.getCommandData)
            .addSubcommand(date.getCommandData)
            .addSubcommand(tomorrow.getCommandData)
    }

    public getName(){
        return this.name;
    }

    public getCommandData(){
        return this.commandData;
    }

    public receiver(interaction: CommandInteraction){
        if(!interaction.isChatInputCommand()) return;

        const subcommand = this.subcommands[interaction.options.getSubcommand()];
        subcommand.receiver(interaction);
    }
}
