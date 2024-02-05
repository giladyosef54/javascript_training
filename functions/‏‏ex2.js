function filterCategory(arrOfObj, category) {
    return arrOfObj.filter(obj => {
        return obj.category == category
    })
}
