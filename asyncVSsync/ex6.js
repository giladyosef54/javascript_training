function createFailingPromise() {
    return new Promise((reserve, rejected) => {
        rejected('FAILED') 
    })
}

function catchFailedPromise() {
    createFailingPromise().catch((str) => console.log(str))
}
