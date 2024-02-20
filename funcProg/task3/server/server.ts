import { WebSocketServer } from "ws";
import dotenv from 'dotenv';
dotenv.config();


const port = +(process.env.PORT || '3000')
const wss = new WebSocketServer( { port } )

wss.on('connection', ws => {
    if (!ws._socket_)
})


