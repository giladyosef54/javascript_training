function discountExpensive(arrOfProduct) {
    return arrOfProduct.filter(product => {
        return product.price > 50
    }).map(expensiveProduct => {
        return {name: expensiveProduct.name, price: expensiveProduct.price * 0.85} 
    })
}



