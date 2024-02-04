function createFiles(filesData){
    const fs = require('fs')
     
    for (let i in filesData) {
        fs.writeFile(filesData[i].fileName + '.' + filesData[i].fileType,
                     filesData[i].fileData.toString(),
                     (err) => {
                        if (err)
                            console.log(err)
                        else console.log('success!')
                     })
    }
}


fileData = {
    fileName:"number",
    fileType:'txt',
    fileData:122
}

l = [fileData]
createFiles(l)