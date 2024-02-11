const fs = require('fs');


const strOrEmpty = (element) => {
    return (typeof element? element: '')
}



let converter = {
    camelCase: function (splitedData) {
        return strOrEmpty(splitedData[0]).toLowerCase() + this.pascalCase(splitedData.slice(1))
    },
    pascalCase: (splitedData) => {
        return splitedData.map(element => strOrEmpty(element[0]).toUpperCase() + element.slice(1).toLowerCase()).join('')
    },
    kebabCase: (splitedData) => {
        return splitedData.map((element) => element.toLowerCase()).join('-')
    },
    snakeCase: (splitedData) => {
        return splitedData.map((element) => element.toLowerCase()).join('_')
    },
    constantCase: (splitedData) => {
        return splitedData.map((element) => element.toUpperCase()).join('_')
    },
    pathCase: (splitedData) => splitedData.join('/')
}


const fixStreetName = (filename) => {
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



fixStreetName('streetNames.txt')