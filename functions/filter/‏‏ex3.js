const filterPastDates = (arrOfDatesStr) => { 
    const now = new Date()
    return arrOfDatesStr.filter(dateStr => now > new Date(dateStr))
}