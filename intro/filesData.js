const createFiles = (filesData) => {
    const fs = require('fs')

    for (let i in filesData) {
        fs.writeFile(`${filesData[i].fileName}.${filesData[i].fileType}`,
                     filesData[i].fileData.toString(),
                     (err) => {
                        if (err)
                            console.log(err)
                        else console.log('success!')
                     })
    }
}

