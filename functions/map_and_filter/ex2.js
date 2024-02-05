function reduceHours(arrOfDurations) {
    return arrOfDurations.filter(duration => {
        return duration >= 24
    }).map(longDuration => {
        return longDuration/24
    })
}



