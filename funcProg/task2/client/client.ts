import { WebSocket } from "ws";
import { logger } from "../utilities/utilities";
import { FileStructure } from "../models/types";
import express, { Router, Request, Response } from 'express';
import { readFile } from "fs";

import dotenv from 'dotenv';
dotenv.config()



const app = express();
const router = Router();


app.use(express.json())
app.use('/', router)

const http_port = process.env.HTTP_PORT
const ip = process.env.IP
// const filesStructLogger = process.env.FILES_STRUCTURE_LOGGER || 'filesStructureLogger.json'

const filesStructLogger: FileStructure[] = [];

const getFileIndex = (fileStructure: FileStructure) => filesStructLogger.findIndex(file =>
    file.fileName == fileStructure.fileName && file.fileType == fileStructure.fileType)


const logRequest = (filesStatusLogger: FileStructure[], fileStruct: FileStructure) => { 
    const fileIndex = getFileIndex(fileStruct)
    
    if (fileIndex == -1) filesStatusLogger.push(fileStruct)
    else filesStatusLogger[fileIndex].fileData += fileStruct.fileData
}

const isValidFileContent = (filesStructLoggerPath:string, actualFileStructure: FileStructure) => {
    readFile(filesStructLoggerPath, (err, data) => {
    if (err) logger.error(err)
    else {
        return JSON.parse(data.toString()).filesStructure.find((fileStructure: FileStructure) => 
            actualFileStructure.fileName == fileStructure.fileName && actualFileStructure.fileType == fileStructure.fileType)
            .fileData === actualFileStructure.fileData
    }
})
}


router.post('/saveFileData', (req: Request, res: Response) => {
    const ws_port = process.env.WS_PORT
    const ws = new WebSocket(`${ip}:${ws_port}`)
    const fileStructure: FileStructure = req.body


    ws.on('open', () => {
        logger.info('Client connected.')
        logRequest(filesStructLogger, fileStructure)
    
        ws.send(JSON.stringify(fileStructure))
    })



    ws.on('message', (data) => {
        logger.info(`Recieved message from the server: ${data}`)

        const serverRes = JSON.parse(data.toString())
        
        res.status(serverRes.status).send(serverRes.message)
        
        filesStructLogger[getFileIndex(fileStructure)]
        if (serverRes.fileContent == filesStructLogger[getFileIndex(fileStructure)].fileData)
            ws.close()
        else throw new Error
    })    
});


app.listen(http_port, () => {
    logger.info(`Server running at ${ip}:${http_port}`);
});
