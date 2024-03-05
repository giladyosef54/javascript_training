import { WebSocket } from "ws";
import { logger, getRndInt } from "../utilities/utilities";

const port = 1234
const min: number = 0, max: number = 100


class KeyWebSocket extends WebSocket {
    key: number|undefined = undefined
}


const kws = new KeyWebSocket(`ws://localhost:${port}`)


kws.on('open', () => {
    logger.info('Client connected.')
    kws.key = getRndInt(min, max)
    kws.send(JSON.stringify({
        eventName: 'initGame',
        message: `Hello this is a client, please guess a number between ${min} to ${max}`,
        min: min,
        max: max
    }))
    
})


kws.on('message', (data) => {
    const parsedData = JSON.parse(data.toString())
    logger.info(`Recieved message from the server: ${parsedData.message}`)
    if (parsedData.isGuessing === true) {
        if (parsedData.serverGuess === kws.key)
        {
            kws.send(JSON.stringify({
                eventName: 'hit',
                message: `You won the game!`
            }))
        }
        else {
            kws.send(JSON.stringify({
                eventName: 'miss',
                message: `${parsedData.serverGuess} was failed guess, try again.`,
            }))
        }
    }  
})