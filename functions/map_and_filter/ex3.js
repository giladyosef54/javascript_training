const upperUniques = (arrOfStr) => 
    arrOfStr.filter((str, index, array) => array.indexOf(str, index + 1) === -1 &&
                                            array.lastIndexOf(str, index - 1) === -1).map(uniqStr => uniqStr.toUpperCase())


