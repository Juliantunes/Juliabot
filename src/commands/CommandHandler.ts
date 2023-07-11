import { Message } from "discord.js";
import { CommandObject } from "../definitions/Command";
import { Hello } from "./hello/Hello";
import { Remind } from "./remind/Remind";
import { CommandInteraction } from "discord.js";

export class CommandHandler {
    private commands: CommandObject;
    private commandDataArray: {}[];

    constructor() {
        this.commands = {};
        this.commandDataArray = [];

        const hello = new Hello();
        this.commands[hello.getName()] = hello;
        this.commandDataArray.push(hello.getCommandData());

        /*
        {
            "hello": Hello Instance
        }
        */

        // const remind = new Remind()
        // this.commands[remind.getName()] = remind
    }

    public getCommandData(){
        return this.commandDataArray;
    }

    onInteraction(interaction:CommandInteraction): void{
        if(!interaction.isCommand()) return;

        // "!hello world" => ["hello", "world"]
        const commandName = interaction.commandName.toLowerCase();

        // ["hello" (THIS IS COMMAND NAME), "world"]
        if(!this.commands[commandName]) return;

        // Check if commandName exists as a key in the commands object
        this.commands[commandName].receiver(interaction)
    }
}

