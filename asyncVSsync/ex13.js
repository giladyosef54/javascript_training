function repeatArrOnScreen(arrOfNums) {
    for (num of arrOfNums) {
        new Promise((resolve) => {
            setTimeout((inervalId) => {
                clearInterval(inervalId)
                resolve()
            }, 5000, setInterval(console.log, 1500, num))
        })
    }
}


repeatArrOnScreen([1,3])//,3443,34,5432,524])