import { WebSocketServer } from "ws";
import dotenv from 'dotenv';
import { WebSocketWithId } from '../models/types'
dotenv.config();


const port = +(process.env.PORT || '3000')
const wss = new WebSocketServer( { port } )

wss.on('connection', (ws: WebSocketWithId) => {
    
})


