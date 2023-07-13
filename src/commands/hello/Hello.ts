import { Message, SlashCommandBuilder } from "discord.js";
import { Command } from "../../definitions/Command";
import { CommandInteraction } from "discord.js";

export class Hello implements Command {
    private name: string;
    private commandData: SlashCommandBuilder;

    constructor(){
        this.name = "hello";
        this.commandData = new SlashCommandBuilder();
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