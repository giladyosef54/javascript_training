import { WebSocket } from "ws";
import { logger } from "../utilities/utilities";

const port = 1234
const ws = new WebSocket(`ws://localhost:${port}`)
const clientGuess: number

ws.on('open', () => {
    logger.info('Client connected.')
    clientGuess = 
    ws.send('Hello this is a client, please start guesting')
})

ws.on('message', (data) => {
    if (data == )
    logger.info(`Recieved message from the server: ${data}`)
})