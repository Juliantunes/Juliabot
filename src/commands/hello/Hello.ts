import { Message } from "discord.js";
import { Command } from "../../definitions/Command";

export class Hello implements Command {
    private name: string;

    constructor(){
        this.name = "hello";
    }

    public getName(){
        return this.name;
    }

    public receiver(message: Message){
        message.reply('Hello, handsome!')
    }
}