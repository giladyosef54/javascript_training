function wishListCost(arrOfwishes) {
    return arrOfwishes.reduce((total, wish) => total + wish.price , 0)
}

