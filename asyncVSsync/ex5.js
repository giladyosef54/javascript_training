const utl = require('./utilities')

const createRandomPromise = () => {
    return new Promise((reserve) => {
        setTimeout(() => {
            reserve()
        }, utl.getRndInteger(0, 20) * 1000) 
    })
}

const createSomePromises = (num) => {
    for (let i = 0; i < num; ++i) {
        createRandomPromise().then(() => utl.logger.info(`promise ${i} end`))
    }
}
