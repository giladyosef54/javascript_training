const logger = require('./utilities').logger
const fs = require('fs')

const createFiles = (filesData) => {
    filesData.forEach(file => {
        fs.writeFile(`${file.fileName}.${file.fileType}`,
                     file.fileData.toString(),
                     (err) => {
                        if (err) logger.error(err)
                        else logger.info('success!')
                     })
    })
}

