import Discord, { GatewayIntentBits, Message } from "discord.js";
import { CommandHandler } from "../commands/CommandHandler";

export class DiscordBot {
    private client: Discord.Client
    private handler: CommandHandler;

    constructor() {
        this.client = new Discord.Client({
          intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent,
            GatewayIntentBits.GuildMembers,
          ],
        });

        this.handler = new CommandHandler();
    }
    
    enable() {
        this.client.on("messageCreate", (message: Message) => {
            this.handler.onMessage(message);
        })

        this.client.on('ready', () => {
            console.log('JuliasBot is online'); 
        });
        
        this.client.login('MTEwMzQxNDE2Njc0MTU5ODMyOA.GONSj3.Nv-YYu_QF2TB4sme3YpVWhmdxkgt34jBIBcIk4')
    }
}