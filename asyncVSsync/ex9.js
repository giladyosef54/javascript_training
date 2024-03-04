const logger = require('./utilities').logger


const terminateScreen = () => {
    const intervalId = setInterval(() => {
        logger.info('Hello World')
    }, 1000)
    new Promise((resolve) => {
        setTimeout(resolve, 10000, intervalId)
    }).then((id) => clearInterval(id))
}
