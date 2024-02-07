function promiseForeachNumber(num) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(num);
        }, num * 500);
    });
}


  
function printSortedArray(arr) {
    for (let num of arr) {
        promiseForeachNumber(num).then(num => console.log(num));
    }
}
