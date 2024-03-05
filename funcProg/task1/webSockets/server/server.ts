import { WebSocketServer, WebSocket } from "ws";
import { logger, getRndInt } from "../utilities/utilities";

const port = 1234;
const wss = new WebSocketServer({ port })


const tryAcomplish = (ws: WebSocket, min: number, max: number) => {
    const serverGuess = getRndInt(min, max)
    ws.send(JSON.stringify({
        eventName: 'guess',
        message: `Tried to guess the number ${serverGuess}, did I succeed?`,
        serverGuess: serverGuess
    }))
}

const remindExistence = (ws: WebSocket) => {
    ws.send(JSON.stringify({
        eventName: 'infoClient',
        message: 'Calculating next guess...',
    }))
}


wss.on('connection', (ws) => {

    ws.on('message', (data) => {
        const {eventName, message, ...eventData} = JSON.parse(data.toString())
        logger.info(`Recieved message from client: ${message}`)

        if (ws.listeners(eventName).length == 0) {
            ws.send(JSON.stringify({
                eventName: 'eventNameError',
                message: `Such event doesn't exist.`
            }))
        }
        else {
            try {
                ws.emit(eventName, eventData)
            }
            catch (error) {
                ws.send(JSON.stringify({
                    eventName: 'eventParametersError',
                    message: (error as TypeError).message
                }))
            }
        }
    })

    ws.on('initGame', ({min, max}) => {
        setInterval(tryAcomplish, 200, ws, min, max)
        setTimeout(setInterval, 100, remindExistence, 200, ws)
    })

    ws.on('miss', ({}) => {
    })

    ws.on('hit', ({}) => {
        ws.terminate()
    })
})

