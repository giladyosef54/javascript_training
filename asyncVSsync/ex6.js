const logger = require('./utilities').logger

const createFailingPromise = () => {
    return new Promise((reserve, rejected) => {
        rejected('FAILED') 
    })
}

const catchFailedPromise = () => {
    createFailingPromise().catch((str) => logger.info(str))
}
