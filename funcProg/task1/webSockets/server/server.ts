import { WebSocketServer, WebSocket } from "ws";
import { logger, getRndInt } from "../utilities/utilities";

const port = 1234;
const wss = new WebSocketServer({ port })

logger.info(`Server is listening on ${port}.`)


const tryAcomplish = (ws: WebSocket, min: number, max: number) => {
    const serverGuess = getRndInt(min, max)
    logger.info(`Gussing the number ${serverGuess}, and send a guess request to client to check if i won.`)
    ws.send(JSON.stringify({
        eventName: 'guess',
        message: `Tried to guess the number ${serverGuess}, did I succeed?`,
        serverGuess: serverGuess
    }))
}

const remindExistence = (ws: WebSocket) => {
    logger.info('Reminding my existence to the client.')
    ws.send(JSON.stringify({
        eventName: 'infoClient',
        message: 'Calculating next guess...',
    }))
}

wss.on('connection', (ws) => {
    ws.on('open', () => {
        logger.info('A client connected to the server.')
    })

    ws.on('message', (data) => {
        logger.info('Some data recieved from the client.')
        const {eventName, ...eventData} = JSON.parse(data.toString())

        if (ws.listeners(eventName).length == 0) {
            logger.info(`A fit event for client's data doesn't exist, sending a fit error to the client.`)
            ws.send(JSON.stringify({
                eventName: 'eventNameError',
                message: `Such event doesn't exist, event name: ${eventName}.`
            }))
        }
        else {
            try {
                logger.info(`A fit evet for server's data exist, now emiting this event.`)
                ws.emit(eventName, eventData)
            }
            catch (error) {
                logger.error(`Something went wrong with the emiting, or maybe other unhandled exeption occured during the event.`)
                ws.send(JSON.stringify({
                    eventName: 'eventParametersError',
                    message: (error as TypeError).message
                }))
            }
        }
    })

    ws.on('initGame', ({message, min, max}) => {
        logger.info(`Recieved init game request from the client, request message: ${message}`)
        setInterval(tryAcomplish, 2000, ws, min, max)
        setTimeout(setInterval, 1000, remindExistence, 2000, ws)
    })

    ws.on('miss', ({message}) => {
        logger.info(`Recieved a miss notification from the client, client note message: ${message}`)
    })

    ws.on('hit', ({message}) => {
        logger.info(`Recieved an hit notification from the client, client note message: ${message}`)
    })
})

