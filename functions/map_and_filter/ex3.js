function upperUniques(arrOfStr) {
    return arrOfStr.filter((str, index, array) => array.indexOf(str, index + 1) == -1).map(uniqStr => uniqStr.toUpperCase())
}

