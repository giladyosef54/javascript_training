const filterPastDates = (arrOfDatesStr) => arrOfDatesStr.filter(dateStr => new Date > new Date(dateStr))
