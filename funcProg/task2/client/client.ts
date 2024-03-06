import { WebSocket } from "ws";
import { logger } from "../utilities/utilities";
import { FileStructure } from "../models/types";
import express, { Router, Request, Response } from 'express';

import dotenv from 'dotenv';
dotenv.config()



const app = express();
const router = Router();


app.use(express.json())
app.use('/', router)

const http_port = process.env.HTTP_PORT
const ip = process.env.IP

const filesStructLogger: FileStructure[] = [];

const getFileIndex = (fileStructure: FileStructure) => filesStructLogger.findIndex(file =>
    file.fileName == fileStructure.fileName && file.fileType == fileStructure.fileType)


const logRequest = (fileStrut: FileStructure) => {
    
    const createFile = (newFile: FileStructure) => {
        filesStructLogger.push(newFile)
    }
    const modifyFile = (fileIndex: number) => {
        filesStructLogger[fileIndex].fileData += fileStrut.fileData
    }
    

    const fileIndex = getFileIndex(fileStrut)
    
    
    if (fileIndex == -1) createFile(fileStrut)
    else modifyFile(fileIndex)
}




router.post('/saveFileData', (req: Request, res: Response) => {
    const ws_port = process.env.WS_PORT
    const ws = new WebSocket(`ws://localhost:${ws_port}`)
    const fileStructure: FileStructure = req.body


    ws.on('open', () => {
        logger.info('Client connected.')
        logRequest(fileStructure)
    
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
