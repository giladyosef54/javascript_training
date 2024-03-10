import { WebSocket } from "ws";
import { logger } from "../utilities/utilities";
import { FileStructure } from "../models/types";
import {Router, Request, Response } from 'express';
import express from 'express';
import { readFileSync, writeFileSync, existsSync } from "fs";
import {config} from 'dotenv';

config()


const app = express();


const router = Router();


app.use(express.json())
app.use('/', router)

const http_port = process.env.HTTP_PORT
const ip = process.env.IP
const filesStructLogger = process.env.FILES_STRUCTURE_LOGGER || 'filesStructureLogger.json'

// const filesStructLogger: FileStructure[] = [];

const getFileIndex = (filesStructLogger: FileStructure[], fileStructure: FileStructure) => filesStructLogger.findIndex(file =>
    file.fileName == fileStructure.fileName && file.fileType == fileStructure.fileType)


const logRequest = (filesStructureLoggerPath: string, fileStruct: FileStructure) => {
    if (!existsSync(filesStructureLoggerPath)) {
        writeFileSync(filesStructureLoggerPath, JSON.stringify([]))

    }
    const filesStructLogger = JSON.parse(readFileSync(filesStructureLoggerPath).toString())
    const fileIndex = getFileIndex(filesStructLogger, fileStruct)

    if (fileIndex == -1) filesStructLogger.push(fileStruct)
    else {
        filesStructLogger[fileIndex].fileData += fileStruct.fileData
    }
    writeFileSync(filesStructureLoggerPath, JSON.stringify(filesStructLogger))
}

const isMatchFileContent = (filesStructLoggerPath:string, expectedFileStructure: FileStructure) => {
    const filesStructLogger = JSON.parse(readFileSync(filesStructLoggerPath).toString())
    console.log(JSON.stringify(filesStructLogger))
    console.log(JSON.stringify(expectedFileStructure))
    const fileIndex = getFileIndex(filesStructLogger, expectedFileStructure)
    
    return filesStructLogger[fileIndex].fileData === expectedFileStructure.fileData
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
        fileStructure.fileData = serverRes.fileContent
        if (isMatchFileContent(filesStructLogger, fileStructure))
            ws.close()
        else throw Error
    })    
});


app.listen(http_port, () => {
    logger.info(`Server running at ${ip}:${http_port}`);
});
