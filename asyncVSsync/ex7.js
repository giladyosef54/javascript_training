utl = require('./utilities')

const createNestedPromise = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(new Promise((resolve) => {
                setTimeout(() => {
                    const randInt = utl.getRndInteger(1, 10)
                    resolve(randInt)
                }, 1000)
            }))
        }, 500)
    })
}