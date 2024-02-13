const logger = require('./utilities').logger


const repeatArrOnScreen = (arrOfNums) => {
    for (num of arrOfNums) {
        new Promise((resolve) => {
            setTimeout((inervalId) => {
                clearInterval(inervalId)
                resolve()
            }, 5000, setInterval(logger.info, 1500, num))
        })
    }
}


