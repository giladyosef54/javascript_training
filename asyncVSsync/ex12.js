const logger = require('./utilities').logger

const getSmaller = (arrOfNum) => {
    const promisesPerNum = []
    for (num of arrOfNum) {
        promisesPerNum.push(new Promise((resolve) => {
            setTimeout(resolve, num * 500, num)
        }))
    }
    Promise.race(promisesPerNum).then(num => logger.info(num))
}

