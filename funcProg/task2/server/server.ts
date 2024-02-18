import { WebSocketServer } from "ws";
import {fileStructure} from '../models/types'
import { logger } from "../utilities/utilities";
import dotenv from 'dotenv';
dotenv.config();

const files: fileStructure[] = []

const port = +(process.env.PORT || '3000')
const wss = new WebSocketServer({ port })

wss.on('connection', ws=> {
    logger.info(`Server connected to client`)
    ws.on('message', data => {
        logger.info(`Recieving message from client: ${data}`)
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