import { WebSocket } from 'ws'
import {start} from 'node:repl'
import dotenv from 'dotenv'
dotenv.config()

const ip = process.env.IP
const port = process.env.PORT

const ws = new WebSocket(`${ip}:${port}`)

const replServer = start({ prompt: '> ' });

replServer.defineCommand('register', {
    help: `Enter your name, notice that you can't have a name which already exist.\nthis command has to work once and only once.`,
    action : (name: string) => {
        replServer.clearBufferedCommand();
        ws.send(JSON.stringify({
            eventName: 'register',
            eventData: name
        }))
        replServer.displayPrompt();
    },
});


ws.on('open', () => {

})