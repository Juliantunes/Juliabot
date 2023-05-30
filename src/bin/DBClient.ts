import mongoose from "mongoose";
import { Reminder } from "../definitions/ReminderModel";

export class DBClient {
    db: typeof mongoose | null;

    constructor(){
        this.db = null;
    }

    async start(){
        this.db = await mongoose.connect("mongodb://127.0.0.1:27017/test");
        console.log("Connected!");
    }

    async loadAllReminders(){
        try {
            const reminders = await Reminder.find()
            if(reminders){
               console.log("Reminders loaded:", reminders)
            }
            else {
               console.log("Reminders not found")
            }
           }
           catch (error) {
               console.error('An error occured with loading process', error)
   
               throw new Error('Failed to load reminders.')
   
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