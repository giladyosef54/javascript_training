function initialNames(arrOfNames) {
    return arrOfNames.map(fullName => {
        return fullName.split(' ').map(partName => {
            return partName[0].toUpperCase()
        }).join('')
    })
}

