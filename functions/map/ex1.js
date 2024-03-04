const initialNames = (arrOfNames) => {
    return arrOfNames.map(fullName => fullName.split(' ').map(partName => partName[0].toUpperCase()).join(''))
}


