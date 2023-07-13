import { CommandInteraction, Message, SlashCommandBuilder, SlashCommandSubcommandBuilder, TextChannel } from "discord.js";

export interface Subcommand {
    getName: () => string;
    getCommandData: (subcommand: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder;
    receiver: (interaction:CommandInteraction) => unknown;
}

export interface SubcommandObject {
    [name: string]: Subcommand
}

export interface Command {
    getName: () => string;
    receiver: (interaction:CommandInteraction) => unknown;
    getCommandData: () => SlashCommandBuilder;
}

export interface CommandObject {
    [key: string]: Command
}