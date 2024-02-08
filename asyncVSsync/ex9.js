function terminateScreen() {
    const intervalId = setInterval(() => {
        console.log('Hello World')
    }, 1000)
    new Promise((resolve) => {
        setTimeout(resolve, 10000, intervalId)
    }).then((id) => clearInterval(id))
}
