import Discord, { GatewayIntentBits, Message } from "discord.js";
import { CommandHandler } from "../commands/CommandHandler";
import { DBClient } from "./DBClient";
import { Interaction } from "discord.js";
import { CommandInteraction } from "discord.js";
import { commandData } from "../utilities/RemindData";


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

            const guild = this.client.guilds.cache.get('1103414166741598328')
            try{
                commandData
                await guild?.commands.create(commandData)
                console.log('slash command created')
            }
            
            catch(error){
                console.error('Error creating slash command')
            }
        



        });
        
        this.client.login(process.env.DISCORD_TOKEN);
    }
}