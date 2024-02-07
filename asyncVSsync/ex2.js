function retrunRndIn3Sec() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const utl = require('./utilities')
            const randInt = utl.getRndInteger(50, 100)
            if (randInt > 85) reject('Too big number')
            else resolve(randInt);
        }, 3000);
    });
}
  
function printValidInt() {
    retrunRndIn3Sec().then(result => console.log(result)).catch(error => console.error(error));
}
