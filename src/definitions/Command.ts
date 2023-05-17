import { Message, TextChannel } from "discord.js"

export interface Command {
    getName: () => string;
    receiver: (message: Message) => unknown;
}

export interface CommandObject {
    [key: string]: Command
}