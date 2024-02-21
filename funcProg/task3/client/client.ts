import { WebSocket } from 'ws'
import {start} from 'node:repl'
import dotenv from 'dotenv'
dotenv.config()

const ip = process.env.IP
const port = process.env.PORT

const ws = new WebSocket(`${ip}:${port}`)



const replServer = start({ prompt: '> ' });


ws.on('message', (data) => {
    replServer.write(data.toString() + '\n')
})


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


replServer.defineCommand('brodcast', {
    help: `Send message to all connected users`,
    action : (message: string) => {
        replServer.clearBufferedCommand();
        ws.send(JSON.stringify({
            eventName: 'brodcast',
            eventData: message
        }))
        replServer.displayPrompt();
    },
});


replServer.defineCommand('target', {
    help: `Enter your name, notice that you can't have a name which already exist.\nthis command has to work once and only once.`,
    action : (targetNameAndMessage: string) => {
        replServer.clearBufferedCommand();
        const [targetName, message] = targetNameAndMessage.split('#')
        ws.send(JSON.stringify({
            eventName: 'target',
            targetName: targetName.trim(),
            eventData: message.trim()
        }))
        replServer.displayPrompt();
    },
});



