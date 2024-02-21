import { WebSocket } from 'ws'


interface Message {
    text: string
}

interface DstMessage {
    dst: string,
    text: string
}

interface wsDetails {
    id: number,
    name: string,
    ws: WebSocket
}


export { Message, DstMessage, wsDetails }