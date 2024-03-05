import { WebSocketServer, WebSocket } from "ws";
import { logger, getRndInt } from "../utilities/utilities";

const port = 1234;
const wss = new WebSocketServer({ port })

const tryAcomplish = (ws: WebSocket, min: number, max: number) => {
    const serverGuess = getRndInt(min, max)
    ws.send(JSON.stringify({
        message: `Tried to guess the number ${serverGuess}, did I succeed?`,
        serverGuess: serverGuess,
        isGuessing: true
    }))
}

const remindExistence = (ws: WebSocket) => {
    ws.send(JSON.stringify({
        message: 'Calculating next guess...',
        isGuessing: false
    }))
}


wss.on('connection', (ws) => {

    ws.on('message', (data) => {
        const {eventName, ...eventData} = JSON.parse(data.toString())
        logger.info(`Recieved message from client: ${eventData.message}`)

        if (ws.listeners(eventName).length == 0) {
            ws.send(`Such operation doesn't exist, please try again.\nyou may check for spelling.`)
        }
        else {
            try {
                ws.emit(eventName, ...eventData)
            }
            catch (error) {
                ws.send((error as TypeError).message)
            }
        }
    })

    ws.on('initeGame', (min: number, max: number) => {

        setInterval(tryAcomplish, 2000, ws, min, max)
        setTimeout(setInterval, 1000, remindExistence, 2000, ws)
    })

    ws.on('hit', () => {
        ws.terminate()
    })
})

