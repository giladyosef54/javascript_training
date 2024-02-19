import { WebSocket } from "ws";
import { logger } from "../utilities/utilities";
import { FileStructure } from "../models/types";
import express, { Router, Request, Response } from 'express';

import dotenv from 'dotenv';
import { create } from "domain";
dotenv.config()



// Implemets routes

const app = express();
const router = Router();


app.use(express.json())
app.use('/', router)

const http_port = process.env.HTTP_PORT
const ip = process.env.IP

const filesStructLogger: FileStructure[] = [];

const getFileIndex = (fileStructure: FileStructure) => filesStructLogger.findIndex(file =>
    file.fileName == fileStructure.fileName && file.fileType == fileStructure.fileType)


const logRequest = (newFile: FileStructure) => {
    
    const createFile = (newFile: FileStructure) => {
        filesStructLogger.push(newFile)
    }
    const modifyFile = (fileIndex: number) => {
        filesStructLogger[fileIndex].fileData += newFile.fileData
    }
    

    const fileIndex = getFileIndex(newFile)
    
    
    if (fileIndex == -1) createFile(newFile)
    else modifyFile(fileIndex)
}




router.post('/saveFileData', (req: Request, res: Response) => {
    const ws_port = process.env.WS_PORT
    const ws = new WebSocket(`ws://localhost:${ws_port}`)
    const fileStructure: FileStructure = req.body


    ws.on('open', () => {
        logger.info('Client connected.')
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

    setTimeout(()=>{
        
        logRequest(fileStructure)
    
        ws.send(JSON.stringify(fileStructure))
    }, 100)

    
});


app.listen(http_port, () => {
    logger.info(`Server running at http://${ip}:${http_port}`);
});
