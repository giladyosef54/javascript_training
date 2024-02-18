import { WebSocket } from "ws";
import {fileStructure} from '../models/types'
import dotenv from 'dotenv';
dotenv.config();

const ip = process.env.IP
const port = process.env.PORT 


const ws = new WebSocket(`ws://${ip}:${port}`)

ws.on('open', () => {
    
})