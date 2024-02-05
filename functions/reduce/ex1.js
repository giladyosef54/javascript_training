function countVoters(arrOfVoters) {
    return arrOfVoters.reduce((total, voter) => total + voter.voted , 0)
}
