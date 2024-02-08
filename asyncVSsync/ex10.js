function isBothGood(promise1, promise2) {
    return Promise.all([promise1, promise2])
}


isBothGood(Promise.reject('first'), Promise.resolve('second')).then(values => console.log(values)).catch(err => console.error(err))