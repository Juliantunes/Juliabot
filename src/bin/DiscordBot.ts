import Discord, { GatewayIntentBits, Message, REST, Routes } from "discord.js";
import { CommandHandler } from "../commands/CommandHandler";
import { DBClient } from "./DBClient";
import { Interaction } from "discord.js";
import { CommandInteraction } from "discord.js";

export class DiscordBot {
    private client: Discord.Client
    private handler: CommandHandler;
    private dbClient:DBClient

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
        this.dbClient = new DBClient()
    }
    
    async enable() {
        this.client.on("InteractionCreate", (interaction: CommandInteraction) => {
            this.handler.onInteraction(interaction);
        })

        await (new DBClient()).start();

        this.client.on('ready', async () => {
            console.log('JuliasBot is enabled!'); 
        });

        const rest = new REST().setToken(process.env.DISCORD_TOKEN ?? "");
        
        try{
            await rest.put(
                Routes.applicationGuildCommands("", ""),
                {
                    body: this.handler.getCommandData()
                }
            )
        }catch(err){

        }
        
        this.client.login(process.env.DISCORD_TOKEN);
    }
}