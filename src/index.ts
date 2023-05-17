import dotenv from "dotenv";
dotenv.config();

import { DiscordBot } from "./bin/DiscordBot";

(new DiscordBot()).enable();