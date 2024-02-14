import { WebSocketServer } from "ws";
import { serverLogger } from "./utilities";

const port = 1234;
const wss = new WebSocketServer({ port })


serverLogger.info('WebSocket server.')