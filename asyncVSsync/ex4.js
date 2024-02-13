const logger = require('./utilities').logger


const promiseForeachNumber = (num) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num);
        }, num * 1000);
    });
}


  
const printSortedArray = (arr) => {
    for (let num of arr) {
        promiseForeachNumber(num).then(num => logger.info(num));
    }
}
