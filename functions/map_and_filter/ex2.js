const reduceHours = (arrOfDurations) => arrOfDurations.filter(duration => duration >= 24).map(longDuration => longDuration/24)



