const countVoters = (arrOfVoters) => arrOfVoters.reduce((total, voter) => total + voter.voted , 0)

