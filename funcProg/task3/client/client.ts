import { WebSocket } from 'ws'
import dotenv from 'dotenv'
dotenv.config()

const ip = process.env.IP
const port = process.env.PORT

const ws = new WebSocket(`$`)