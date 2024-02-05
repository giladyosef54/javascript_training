function myFilter(arrayOfStr) {
    return arrayOfStr.filter(str => {
        return str.search(/a|e|i|o|u/) != -1
    })
}

