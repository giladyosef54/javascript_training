function splitData(data){
    return data.split("_")
}

function strOrEmpty (element) {
    if (typeof(element) == undefined)
        return ''
    else return element
}



let converter = {
    camelCase:(splitedData) => {
        return strOrEmpty(splitedData[0]).toLowerCase() + this.pascalCase(splitedData.slice(1)).join('')
    },
    pascalCase:(splitedData) => {
        return splitedData.map(element => {
            return strOrEmpty(element[0]).toUpperCase() + element.slice(1).toLowerCase()
        }).join('');
    },
    kebabCase: (splitedData) => {
        return splitData.map((element) => {element.toLowerCase()}).join('-')
    },
    snakeCase: () => {
        return splitData.map((element) => {element.toLowerCase()}).join('_')
    },
    constantCase:function(){
        return splitData.map((element) => {element.toUpperCase()}).join('_')
    },
    pathlCase:function(){
        return splitedData.join('/')
    },
}




function fixStreetName(filename) {
    const fs = require('fs');
    const readline = require('readline');

    
    const fileStream = fs.createReadStream(filename);

    const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
    });
    // Note: we use the crlfDelay option to recognize all instances of CR LF
    // ('\r\n') in input.txt as a single line break.

    for (const line of rl) {
        
    }  
}

function fixStreetName(filename) {

    fs = require('fs')
    fs.readFile(filename, (err, data) => {
        if (err) console.log(err)
        else {
            console.log('Successfully read.')
            data = data.toString().trim().split('\n')
            fixData = ''
            for (let line of data)
            {
                let splitedLine = line.split('|')
                let lineCase = splitedLine[0], lineData = splitedLine[1]
                fixData += converter[lineCase](lineData.split('_')) + '\n'
            }
            fs.writeFile('results.txt', fixData, (err) => {
                if (err) console.log(err)
                else console.log('Successfully written.')})

        }
    });
}

