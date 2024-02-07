function retrunRndIn3Sec() {
    return new Promise((resolve) => {
        setTimeout(() => {
            const utl = require('./utilities')
            resolve(utl.getRndInteger(1, 10));
        }, 3000);
    });
}
  
async function asyncCall() {
    console.log('calling');
    const result = await retrunRndIn3Sec();
    console.log(result);
}
  
