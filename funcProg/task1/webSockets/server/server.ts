import { WebSocketServer } from "ws";
import { serverLogger } from "./utilities";

const port = 1234;
const wss = new WebSocketServer({ port })


wss.on('connection', (wsc) => {
    wsc.on('massage', (data) => {
        serverLogger.info(`Recieved mssaga from client: ${data}`)
    })

    wsc.send('Hello, this is server')
})

serverLogger.info('WebSocket server.')