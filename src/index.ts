import dotenv from "dotenv";
dotenv.config();

import { DiscordBot } from "./bin/DiscordBot";
import mongoose, { mongo } from "mongoose";

(async() => {
    await (new DiscordBot()).enable();

    const Test = mongoose.model("Test", new mongoose.Schema({
        test: String
    }));
})();