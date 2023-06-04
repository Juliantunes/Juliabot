import { CommandInteraction, Message, TextChannel } from "discord.js"

export interface Command {
    getName: () => string;
    receiver: (interaction:CommandInteraction) => unknown;
}

export interface CommandObject {
    [key: string]: Command
}