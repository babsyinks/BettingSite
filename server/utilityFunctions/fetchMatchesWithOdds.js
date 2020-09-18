 function getMatches(teams,games){
    if(games.length !== 0){
        //this means there are games that haven't been set yet from the front end
        if(games.length !== teams.length/2){
          const arrOfTeams = teams.map((teamObj)=>teamObj.team)
          games.forEach((game)=>{
            const homeTeamIndex = arrOfTeams.findIndex((team)=>team === game.homeTeam)
            //remove existing team that has its match set
            arrOfTeams.splice(homeTeamIndex,1)
            const awayTeamIndex = arrOfTeams.findIndex((team)=>team === game.awayTeam)
            //remove existing team that has its match set
            arrOfTeams.splice(awayTeamIndex,1)
          }) 
          
        }
        //this means all games have been set from the frontend
        else{

        }
    }
    else{

    }
 }
 
 function getLeaguesWithOdds(league,countryObj){
    const topTier = league === 'EPL'||league === 'La Liga'||league === '1.Bundesliga'||league ==='Serie A'
    const secondTier = league === 'Championship'||league === 'La Liga2' ||league === '2.Bundesliga'||league === 'Serie B'
    const thirdTier = league === 'League 1'||league === 'Segunda B'||league === '3.Liga'||league === 'Serie C'
    const fourthTier = 'League 2'
    const leagueArr = countryObj.leagues
    if(topTier){
       const{teams,games} = leagueArr[0]

    }
 }
 
 function fetchMatchesWithOdds(country,league,allCountries){
    switch(country){
        case 'England':
            const englishLeagues = allCountries[0]
            switch(league){

            }
            break
        
        case 'Spain':
        
            break
        case 'Germany':

            break
        case 'Italy':

            break
        }
}

module.exports = fetchMatchesWithOdds