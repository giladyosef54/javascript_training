const utl = require('./utilities')

const retrunRndIn3Sec = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            
            const randInt = utl.getRndInteger(50, 100)
            if (randInt > 85) reject('Too big number')
            else resolve(randInt);
        }, 3000);
    });
}
  
const printValidInt = () => {
    retrunRndIn3Sec().then(result => utl.logger.info(result)).catch(error => utl.logger.error(error));
}

