import { Message } from "discord.js";
import { Command } from "../../definitions/Command";
import { CommandInteraction } from "discord.js";

export class Hello implements Command {
    private name: string;

    constructor(){
        this.name = "hello";
    }

    public getName(){
        return this.name;
    }

    public receiver(interaction: CommandInteraction){
        interaction.reply('Hello, handsome!')
    }
}