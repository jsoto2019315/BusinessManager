import { config } from "dotenv";
config();

import Sever from "./configs/server.js";

const server = new Sever();

server.listen();