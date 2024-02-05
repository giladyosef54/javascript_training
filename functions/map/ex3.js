function combineDetails(arrOfPerson) {
    return arrOfPerson.map(person => {
        return {label: person.name + ' - ' + person.age + ' years old'}
    })
}


