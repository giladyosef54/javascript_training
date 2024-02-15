import { WebSocketServer } from "ws";
import { logger, getRndInt } from "../utilities/utilities";

const port = 1234;
const wss = new WebSocketServer({ port })


wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        const parsedData = JSON.parse(data.toString())
        logger.info(`Recieved message from client: ${parsedData.message}`)
        
        if (parsedData.messageType === 'initGame')
        {
            
            const tryAcomplish = () => {
                const serverGuess = getRndInt(parsedData.min, parsedData.max)
                ws.send(JSON.stringify({
                    message: `Tried to guess the number ${serverGuess}, did I succeed?`,
                    serverGuess: serverGuess,
                    isGuessing: true
                }))
            }
            const remindExistence = () => {
                ws.send(JSON.stringify({
                    message: 'Calculating next guess...',
                    isGuessing: false
                }))
            }

            setInterval(tryAcomplish, 2000)
            setTimeout(setInterval, 1000, remindExistence, 2000)
            
        }
        else if (parsedData.messageType === 'hit')
        {
            ws.terminate()
        }
    })
})


