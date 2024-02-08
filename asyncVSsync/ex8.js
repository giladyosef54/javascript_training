function createRiskyPromises(amount) {
    let riskyPromises = []
    for (let i = 0; i < amount; ++i) {
        const utl = require('./utilities')
        riskyPromises.push(new Promise((resolve, reject) => {
            const successful = utl.getRndInteger(0, 1)
            setTimeout(() => {
                if (successful) resolve('success')
                else reject(`First rejected: ${i}`)
            }, 10000)
        }))
    }
    Promise.all(riskyPromises).then((massage) => {console.log(massage)}).catch(err => console.error(err))
}


