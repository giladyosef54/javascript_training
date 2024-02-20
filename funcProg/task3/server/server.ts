import WebSocketServer from "ws";
import dotenv from 'dotenv';
dotenv.config();


const port = process.env.PORT
const wss = new WebSocketServer()