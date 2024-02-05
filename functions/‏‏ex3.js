function filterPastDates(arrOfDatesStr) {
    return arrOfDatesStr.filter(dateStr => {
        return new Date > new Date(dateStr)
    })
}
