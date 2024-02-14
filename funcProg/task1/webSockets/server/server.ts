import { WebSocketServer } from "ws";
import { logger, getRndInt } from "../utilities/utilities";

const port = 1234;
const wss = new WebSocketServer({ port })


wss.on('connection', (ws) => {
    ws.on('massage', (data) => {
        logger.info(`Recieved mssaga from client: ${data}`)
    })

    ws.send('Hello, this is server')
})

logger.info('WebSocket server.')