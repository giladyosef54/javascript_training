function createNestedPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(new Promise((resolve) => {
                setTimeout(() => {
                    utl = require('./utilities')
                    const randInt = utl.getRndInteger(1, 10)
                    resolve(randInt)
                }, 1000)
            }))
        }, 500)
    })
}