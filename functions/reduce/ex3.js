function flatArr(arrOfArrs) {
    return arrOfArrs.reduce((total, arr) => total.concat(arr) , [])
}
