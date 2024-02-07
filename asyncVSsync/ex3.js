function retrunSumIn5Sec(intNum) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Array.from(Array(intNum + 1).keys()).reduce((total, value) => total + value, 0));
        }, 5);
    });
}


  
function printSum(intNum) {
    retrunSumIn5Sec(intNum).then(sum => console.log(sum));
}

