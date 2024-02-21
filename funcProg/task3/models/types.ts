import { WebSocket } from 'ws'


interface WSMessage {
    dst: string | undefined
    message: string
}


export { WSMessage }