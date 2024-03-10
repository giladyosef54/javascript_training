"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const utilities_1 = require("../utilities/utilities");
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
const fs_1 = require("fs");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const app = (0, express_2.default)();
const router = (0, express_1.Router)();
app.use(express_2.default.json());
app.use('/', router);
const http_port = process.env.HTTP_PORT;
const ip = process.env.IP;
const filesStructLogger = process.env.FILES_STRUCTURE_LOGGER || 'filesStructureLogger.json';
// const filesStructLogger: FileStructure[] = [];
const getFileIndex = (filesStructLogger, fileStructure) => filesStructLogger.findIndex(file => file.fileName == fileStructure.fileName && file.fileType == fileStructure.fileType);
const logRequest = (filesStructureLoggerPath, fileStruct) => {
    if (!(0, fs_1.existsSync)(filesStructureLoggerPath)) {
        (0, fs_1.writeFileSync)(filesStructureLoggerPath, JSON.stringify([]));
    }
    const filesStructLogger = JSON.parse((0, fs_1.readFileSync)(filesStructureLoggerPath).toString());
    const fileIndex = getFileIndex(filesStructLogger, fileStruct);
    if (fileIndex == -1)
        filesStructLogger.push(fileStruct);
    else {
        filesStructLogger[fileIndex].fileData += fileStruct.fileData;
    }
    (0, fs_1.writeFileSync)(filesStructureLoggerPath, JSON.stringify(filesStructLogger));
};
const isMatchFileContent = (filesStructLoggerPath, expectedFileStructure) => {
    const filesStructLogger = JSON.parse((0, fs_1.readFileSync)(filesStructLoggerPath).toString());
    console.log(JSON.stringify(filesStructLogger));
    console.log(JSON.stringify(expectedFileStructure));
    const fileIndex = getFileIndex(filesStructLogger, expectedFileStructure);
    return filesStructLogger[fileIndex].fileData === expectedFileStructure.fileData;
};
router.post('/saveFileData', (req, res) => {
    const ws_port = process.env.WS_PORT;
    const ws = new ws_1.WebSocket(`${ip}:${ws_port}`);
    const fileStructure = req.body;
    ws.on('open', () => {
        utilities_1.logger.info('Client connected.');
        logRequest(filesStructLogger, fileStructure);
        ws.send(JSON.stringify(fileStructure));
    });
    ws.on('message', (data) => {
        utilities_1.logger.info(`Recieved message from the server: ${data}`);
        const serverRes = JSON.parse(data.toString());
        res.status(serverRes.status).send(serverRes.message);
        fileStructure.fileData = serverRes.fileContent;
        if (isMatchFileContent(filesStructLogger, fileStructure))
            ws.close();
        else
            throw Error;
    });
});
app.listen(http_port, () => {
    utilities_1.logger.info(`Server running at ${ip}:${http_port}`);
});
