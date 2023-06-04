import { Tomorrow } from "../commands/remind/subcommands/Tomorrow";
import { ApplicationCommandOptionType } from "discord.js";
export const commandData = {
    name: 'remind',
    description:'Set a reminder',
    options: [
        {
            name: 'event', 
            description:'event or task to be reminded of',
            type: ApplicationCommandOptionType.String,
            required: true
        }, 
        {   name: 'time', 
            description: 'Time for reminder', 
            type: ApplicationCommandOptionType.Number,
            required:false,
            choices: [
                {
                    name: 'HH:MM', value:'hh:mm'
                },
                {
                    name: 'In X hours', value: 'x-hours'
                },
                {
                    name: 'In X minutes', value:'x-minutes'
                },
                {
                    name: 'Tomorrow', value: 'tomorrow'

                },
                {
                    name: 'Today', value: 'today'
                }
            ]
        }
    ]
}