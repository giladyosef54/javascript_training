import { WebSocket } from 'ws'


export interface Message {
    text: string
}

export interface DstMessage {
    dst: string,
    text: string
}

export interface wsDetails {
    id: number,
    name: string,
    ws: WebSocket
}


