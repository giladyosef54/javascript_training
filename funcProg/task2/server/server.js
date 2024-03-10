"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var utilities_1 = require("../utilities/utilities");
var dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
var files = [];
var port = +(process.env.PORT || '3000');
var wss = new ws_1.WebSocketServer({ port: port });
var createFile = function (newFile, ws) {
    files.push(newFile);
    ws.send(JSON.stringify({
        status: 201,
        message: 'File created.',
        fileContent: newFile.fileData
    }));
};
var modifyFile = function (newFile, fileIndex, ws) {
    files[fileIndex].fileData += newFile.fileData;
    ws.send(JSON.stringify({
        status: 201,
        message: 'File already exist, data modified.',
        fileContent: files[fileIndex].fileData
    }));
};
wss.on('connection', function (ws) {
    utilities_1.logger.info("Server connected to client");
    ws.on('message', function (data) {
        utilities_1.logger.info("Recieving message from client: ".concat(data));
        var newFile = JSON.parse(data.toString());
        var fileIndex = files.findIndex(function (file) { return file.fileName == newFile.fileName && file.fileType == newFile.fileType; });
        if (fileIndex == -1)
            createFile(newFile, ws);
        else
            modifyFile(newFile, fileIndex, ws);
    });
});
