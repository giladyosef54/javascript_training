const discountExpensive = (arrOfProduct) => arrOfProduct.filter(product => product.price > 50).map(expensiveProduct => {
        return {name: expensiveProduct.name, price: expensiveProduct.price * 0.85} 
})




