"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var utilities_1 = require("../utilities/utilities");
var express_1 = require("express");
var express = require("express");
var fs_1 = require("fs");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var app = express();
var router = (0, express_1.Router)();
app.use(express.json());
app.use('/', router);
var http_port = process.env.HTTP_PORT;
var ip = process.env.IP;
var filesStructLogger = process.env.FILES_STRUCTURE_LOGGER || 'filesStructureLogger.json';
// const filesStructLogger: FileStructure[] = [];
var getFileIndex = function (filesStructLogger, fileStructure) { return filesStructLogger.findIndex(function (file) {
    return file.fileName == fileStructure.fileName && file.fileType == fileStructure.fileType;
}); };
var logRequest = function (filesStructureLoggerPath, fileStruct) {
    if (!(0, fs_1.existsSync)(filesStructureLoggerPath)) {
        (0, fs_1.writeFileSync)(filesStructureLoggerPath, JSON.stringify([]));
    }
    var filesStructLogger = JSON.parse((0, fs_1.readFileSync)(filesStructureLoggerPath).toString());
    var fileIndex = getFileIndex(filesStructLogger, fileStruct);
    if (fileIndex == -1)
        filesStructLogger.push(fileStruct);
    else {
        filesStructLogger[fileIndex].fileData += fileStruct.fileData;
    }
    (0, fs_1.writeFileSync)(filesStructureLoggerPath, JSON.stringify(filesStructLogger));
};
var isMatchFileContent = function (filesStructLoggerPath, expectedFileStructure) {
    var filesStructLogger = JSON.parse((0, fs_1.readFileSync)(filesStructLoggerPath).toString());
    console.log(JSON.stringify(filesStructLogger));
    console.log(JSON.stringify(expectedFileStructure));
    var fileIndex = getFileIndex(filesStructLogger, expectedFileStructure);
    return filesStructLogger[fileIndex].fileData === expectedFileStructure.fileData;
};
router.post('/saveFileData', function (req, res) {
    var ws_port = process.env.WS_PORT;
    var ws = new ws_1.WebSocket("".concat(ip, ":").concat(ws_port));
    var fileStructure = req.body;
    ws.on('open', function () {
        utilities_1.logger.info('Client connected.');
        logRequest(filesStructLogger, fileStructure);
        ws.send(JSON.stringify(fileStructure));
    });
    ws.on('message', function (data) {
        utilities_1.logger.info("Recieved message from the server: ".concat(data));
        var serverRes = JSON.parse(data.toString());
        res.status(serverRes.status).send(serverRes.message);
        fileStructure.fileData = serverRes.fileContent;
        if (isMatchFileContent(filesStructLogger, fileStructure))
            ws.close();
        else
            throw Error;
    });
});
app.listen(http_port, function () {
    utilities_1.logger.info("Server running at ".concat(ip, ":").concat(http_port));
});
