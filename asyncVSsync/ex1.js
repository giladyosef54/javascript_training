function retrunRndIn3Sec() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const utl = require('./utilities')
            resolve(utl.getRndInteger(1, 10));
        }, 3000);
    });
}
  
function printRandom() {
    retrunRndIn3Sec().then(result => console.log(result));
}

