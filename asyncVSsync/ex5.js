function createRandomPromise() {
    return new Promise((reserve) => {
        const utl = require('./utilities')
        setTimeout(() => {
            reserve()
        }, utl.getRndInteger(0, 20) * 1000) 
    })
}

function createSomePromises(num) {
    for (let i = 0; i < num; ++i) {
        createRandomPromise().then(() => console.log(`promise ${i} end`))
    }
}
