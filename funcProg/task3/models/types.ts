import { WebSocket } from 'ws'


interface WSMessage {
    dst: string | undefined
    text: string
}

interface wsDetails {
    id: number,
    name: string,
    ws: WebSocket
}


export { WSMessage, wsDetails }