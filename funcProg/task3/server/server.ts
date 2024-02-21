import { WebSocketServer, WebSocket } from "ws";
import dotenv from 'dotenv';
import { WSMessage, wsDetails } from '../models/types'
dotenv.config();


const port = +(process.env.PORT || '3000')
const wss = new WebSocketServer( { port } )

let idGen = 0
const websockets: wsDetails[] = []


const registerUsername = (name: string, ws: WebSocket) => {
    if (websockets.find(details => details.name = name)) {
        const details: wsDetails = {
            id: idGen++,
            name: name,     
            ws: ws
        }
        websockets.push(details)
        return `Successfully registered!`
    }
    else {
        return `Not registered, this username already exist.`
    }
        
        
}
const brodcastAllOthers = (id: number, text: string) => {
    websockets.forEach((client) => {
       if (client.id != id) client.ws.send(text)
    });
}

const sendToTarget = (senderId: number, recieverId: number, text: string) => {

}


wss.on('connection', (ws) => {
    let id: number
    let username: string
    let registered = false

    ws.on('open', () => {
        id = idGen++
        
        ws.send("Register your name, until you don't have a name you can't send messages.")
    })

    ws.on('close', () => {
        const index = websockets.indexOf([id, ws], 0);
        if (index > -1) {
            websockets.splice(index, 1);
        }
    })

    ws.on('message', (data) => {
        const {eventName, eventData} = JSON.parse(data.toString())

        if (ws.listeners(eventName).length == 0) {

        }
        else if (!registered) {
            ws.send("You haven't yet registered, please register first and then try again.")
        }
        else {
            ws.emit(eventName, eventData)
        }
    })

    ws.on('register', name => {
        if (registered) ws.send("You can't register twice!")
        else {
            registered = true
            ws.send(registerUsername(name, ws))
        }
    })


    ws.on('brodcast', (text: string) => {
        brodcastAllOthers(id, text)
    })

    ws.on('target', (message: WSMessage) => {
        
    })
    
})


