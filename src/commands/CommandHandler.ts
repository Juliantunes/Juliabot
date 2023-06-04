import { Message } from "discord.js";
import { CommandObject } from "../definitions/Command";
import { Hello } from "./hello/Hello";
import { Remind } from "./remind/Remind";
import { CommandInteraction } from "discord.js";

export class CommandHandler {
    private commands: CommandObject;

    constructor() {
        this.commands = {};

        const hello = new Hello();
        this.commands[hello.getName()] = hello;

        const remind = new Remind()
        this.commands[remind.getName()] = remind
    }

    onInteraction(interaction:CommandInteraction): void{
        if(!interaction.isCommand()) return;

        // "!hello world" => ["hello", "world"]
        const commandName = interaction.commandName.toLowerCase();

        // ["hello" (THIS IS COMMAND NAME), "world"]
        if(!this.commands[commandName])return;

        // Check if commandName exists as a key in the commands object
        this.commands[commandName].receiver(interaction)
       
    }
}

