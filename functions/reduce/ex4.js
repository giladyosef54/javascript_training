const getElectionsRes = (arrOfVoters) => arrOfVoters.reduce((electResult, voter) => {
    if (voter.voted)
        (voter.party in electResult? electResult[voter.party] += 1: electResult[voter.party] = 1)
    return electResult
}, {})


