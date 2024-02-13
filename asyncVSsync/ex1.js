const logger = require('./utilities').logger

const  retrunRndIn3Sec = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const utl = require('./utilities')
            resolve(utl.getRndInteger(1, 10));
        }, 3000);
    });
}
  
const printRandom = () => {
    retrunRndIn3Sec().then(result => logger.info(result));
}

