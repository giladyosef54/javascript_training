const getYoungAdults = (arrOfPerson) => arrOfPerson.filter(person => 25 < person.age && person.age < 35).map(person => person.name)


