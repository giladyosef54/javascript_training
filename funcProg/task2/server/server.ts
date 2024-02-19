import { WebSocketServer } from "ws";
import {FileStructure} from '../models/types'
import { logger } from "../utilities/utilities";
import dotenv from 'dotenv';
dotenv.config();

const files: FileStructure[] = []

const port = +(process.env.PORT || '3000')
const wss = new WebSocketServer({ port })

wss.on('connection', ws=> {
    logger.info(`Server connected to client`)
    ws.on('message', data => {
        logger.info(`Recieving message from client: ${data}`)

        const newFile: FileStructure = JSON.parse(data.toString())
        const fileIndex = files.findIndex(file =>  file.fileName == newFile.fileName && file.fileType == newFile.fileType)

        const createFile = (newFile: FileStructure) => {
            files.push(newFile)
            ws.send(JSON.stringify({
                status: 201,
                message: 'File created.',
                fileContent: newFile.fileData
            }))
        }
        const modifyFile = (fileIndex: number) => {
            files[fileIndex].fileData += newFile.fileData
            ws.send(JSON.stringify({
                status: 201,
                message: 'File already exist, data modified.',
                fileContent: files[fileIndex].fileData
            }))
        }

        if (fileIndex == -1) {
            createFile(newFile)
        }
        else {
            modifyFile(fileIndex)
        }
    })
})