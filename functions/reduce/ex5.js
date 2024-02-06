function getVotersStat(arrOfVoters) {
    return arrOfVoters.reduce((statistic, voter) => {
        if (18 <= voter.age && voter.age <= 25) {
            statistic.VotersCount_18_25 += 1
            statistic.VotingCount_18_25 += voter.voted
        }
        if (26 <= voter.age && voter.age <= 35) {
            statistic.VotersCount_26_35 += 1
            statistic.VotingCount_26_35 += voter.voted
        }
        if (36 <= voter.age && voter.age <= 55) {
            statistic.VotersCount_36_55 += 1
            statistic.VotingCount_36_55 += voter.voted
        }
        return statistic
    }, {VotersCount_18_25:0, VotingCount_18_25:0, VotersCount_26_35:0, VotingCount_26_35:0, VotersCount_36_55:0, VotingCount_36_55:0})
}

