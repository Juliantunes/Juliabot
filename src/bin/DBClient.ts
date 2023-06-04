import mongoose from "mongoose";
import { Reminder } from "../definitions/ReminderModel";
import { scheduleMessage } from "../utilities/TimeUtils";
import { Client, TextBasedChannel } from "discord.js";


export class DBClient {
    db: typeof mongoose | null;

    constructor(){
        this.db = null;
    }

    async start(){
        this.db = await mongoose.connect("mongodb://127.0.0.1:27017/test");
        console.log("Connected!");
    }

    async loadAllReminders() {
        try {
          const reminders = await Reminder.find(); // Retrieve all reminders from the database
          return reminders; // Return the loaded reminders
        } catch (error) {
          console.error("Failed to load reminders:", error);
          throw new Error("Failed to load reminders");
        }
      }
      

      async processReminders(client: Client) {
        const reminders = await this.loadAllReminders(); // Load all reminders from the database
    
        for (const reminder of reminders) {
          const currentTime = Date.now();
          if (reminder.timeStamp !== undefined && reminder.timeStamp > currentTime) {
            // Schedule reminder for message sending
            if (reminder.channel) {
              const channel = client.channels.cache.get(reminder.channel) as TextBasedChannel | undefined;
              if (channel) {
                scheduleMessage(reminder.userId, reminder.timeStamp, channel, reminder.event as string );
              } else {
                console.error(`Channel not found for reminder: ${reminder._id}`);
              }
            } else {
              console.error(`Channel not defined for reminder: ${reminder._id}`);
            }
          }
        }
      }
      
   

    async deleteExpiredReminders() {
       try{ 
        const currentTimeStamp = Math.floor(Date.now() / 1000);
        const result = await Reminder.deleteMany({ timeStamp: { $lt: currentTimeStamp } });

        if (result.deletedCount>0){
            console.log(`${result.deletedCount} expired reminders deleted`)
        }
        else {
            console.log(`No expired reminders found`)

        }
       }
        catch (error) {
            console.error('An error occured during deletion', error)

            throw new Error('Failed to delete expired reminders.')
        }
        
    }



    async loadReminder(reminderId:string) {
        try {
         const reminder = await Reminder.findById(reminderId)
         if(reminder){
            console.log("Reminder loaded:", reminder)
         }
         else {
            console.log("Reminder not found")
         }
        }
        catch (error) {
            console.error('An error occured with loading process', error)

            throw new Error('Failed to load reminder.')

        }
    }

}
