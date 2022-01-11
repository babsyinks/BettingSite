const createLeagues = require('./createLeagues.js')
const {englishTeamsRating,spanishTeamsRating,germanTeamsRating,italianTeamsRating} = require('../data/teamRatings')

const createEachLeague = (league,leagueObj)=>{

    let createdLeagues = null
    switch(league){

        case 'english':
           createdLeagues = createLeagues(englishTeamsRating,leagueObj)
            break

        case 'spanish':
            createdLeagues = createLeagues(spanishTeamsRating,leagueObj)
            break

        case 'german':
            createdLeagues = createLeagues(germanTeamsRating,leagueObj)
            break

        case 'italian':
            createdLeagues = createLeagues(italianTeamsRating,leagueObj)
            break
        default:

    }
    return createdLeagues
}

module.exports = createEachLeague
