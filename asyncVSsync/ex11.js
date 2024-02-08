function isBothGood(promise1, promise2) {
    return Promise.any([promise1, promise2])
}