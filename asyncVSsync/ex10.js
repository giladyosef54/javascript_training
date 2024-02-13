function returnBothResolved(promise1, promise2) {
    return Promise.all([promise1, promise2])
}