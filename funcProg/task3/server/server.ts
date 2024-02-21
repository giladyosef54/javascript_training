import { WebSocketServer, WebSocket } from "ws";
import dotenv from 'dotenv';
import { Message, DstMessage, wsDetails } from '../models/types'
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
        return details.id
    }
    else {
        return -1
    }
}

const deleteWsDetails = (id: number) => {
    const index = websockets.findIndex(ws => ws.id == id)
    if (index > -1 )
        websockets.splice(index, 1)
} 


const brodcastAllOthers = (id: number, text: string) => {
    websockets.forEach((client) => {
       if (client.id != id) client.ws.send(text)
    });
}

const sendToTarget = (senderId: number, senderName: string, sender: WebSocket, recieverName: string, text: string) => {
    const reciever = websockets.find(ws => ws.name == recieverName)
    if (!reciever) {
        sender.send(`A client with such name, doesn't exist`)
    }
    else {
        reciever.ws.send(`You recieved message from ${senderName}, your message is:\n${text}`)
    }

}



wss.on('connection', (ws) => {
    let id: number
    let username: string
    let registered = false

    ws.on('open', () => {     
        ws.send("Hello you connected to the server. Please register your name, until you don't, you can't send messages.")
    })

    ws.on('close', () => {
        deleteWsDetails(id)
    })

    ws.on('message', (data) => {
        const {eventName, ...eventData} = JSON.parse(data.toString())

        if (ws.listeners(eventName).length == 0) {
            ws.send(`Such operation doesn't exist, please try again.\nyou may check for spelling.`)
        }
        else if (!registered) {
            ws.send("You haven't yet registered, please register first and then try again.")
        }
        else {
            try {
                ws.emit(eventName, eventData)
            }
            catch (error) {
                ws.send((error as TypeError).message)
            }
        }
    })

    ws.on('register', (name: Message) => {
        if (registered) ws.send("You can't register twice!")
        else {
            name.text = name.text.trim()
            const result = registerUsername(name.text, ws)
            if (result != -1) {
                registered = true
                id = result
                username = name.text
                ws.send(`Successfully registered!`)
            }
            else {
                ws.send(`Not registered, this username already exist.`)
            }
        }
    })

    ws.on('brodcast', (message: Message) => {
        brodcastAllOthers(id, message.text)
    })

    ws.on('target', (message: DstMessage) => {
        sendToTarget(id, username, ws, message.dst, message.text)
    })
    
})


