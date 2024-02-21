import { WebSocketServer } from "ws";
import dotenv from 'dotenv';
import { WebSocketWithId, WSMessage } from '../models/types'
dotenv.config();


const port = +(process.env.PORT || '3000')
const wss = new WebSocketServer( { port } )

let ipGen = 0
const brodcastAllOthers = (id: string) => {
    wss.clients.forEach((client: ) => {
        if (id === client.id)
    });
} 

wss.on('connection', (ws: WebSocketWithId) => {
    let id: number
    ws.on('open', () => {
        id = ipGen++
        
    })

    ws.on('message', (data) => {
        const wsMsg: WSMessage = JSON.parse(data.toString())
        
        if (wsMsg) {

        }

    })
    
})


