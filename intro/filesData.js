const logger = require('./utilities').logger
const fs = require('fs')

const createFiles = (filesData) => {
    

    for (let i in filesData) {
        fs.writeFile(`${filesData[i].fileName}.${filesData[i].fileType}`,
                     filesData[i].fileData.toString(),
                     (err) => {
                        if (err) logger.info(err)
                        else logger.error('success!')
                     })
    }
}

