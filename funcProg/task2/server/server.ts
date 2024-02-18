import { WebSocketServer } from "ws";
import {fileStructure} from '../models/types'
import dotenv from 'dotenv';
dotenv.config();

const files: fileStructure[] = []

const port = +(process.env.PORT || '3000')
const wss = new WebSocketServer({ port })

wss.on('connection', ws=> {
    ws.on('message', data => {
        const newFile: fileStructure = JSON.parse(data.toString())
        const fileIndex = files.findIndex(file => { file.fileName == newFile.fileName && file.fileType == newFile.fileType})
        const createFile = (newFile: fileStructure) => {
            files.push(newFile)
            ws.send('File already exist, data modified.')
        }
        const modifyFile = (fileIndex: number) => {
            files[fileIndex].fileData = newFile.fileData
            ws.send('File created.')
        
        }

        if (fileIndex == -1) {
            createFile(newFile)
        }
        else {
            modifyFile(fileIndex)
        }
    })
})