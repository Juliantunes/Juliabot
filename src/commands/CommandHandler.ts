import { Message } from "discord.js";
import { CommandObject } from "../definitions/Command";
import { Hello } from "./hello/Hello";
import { Remind } from "./remind/Remind";

export class CommandHandler {
    private commands: CommandObject;

    constructor() {
        this.commands = {};

        const hello = new Hello();
        this.commands[hello.getName()] = hello;

        const remind = new Remind()
        this.commands[remind.getName()] = remind
    }

    onMessage(message: Message): void{
        if(!message.content.startsWith("!")) return;

        // "!hello world" => ["hello", "world"]
        const commandParts = message.content.slice(1).toLowerCase().split(" ");

        // ["hello" (THIS IS COMMAND NAME), "world"]
        const commandName = commandParts[0];

        // Check if commandName exists as a key in the commands object
        if(this.commands[commandName] == null) return;
        
        this.commands[commandName].receiver(message);
    }
}