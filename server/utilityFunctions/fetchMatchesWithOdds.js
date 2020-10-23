const tempData = require('../data/dataTemp')

function assignGamesWithOdds(teams){
    //ratings 5 and above high chance of high scores
    //ratings 4 below low chance of high scores
    //ratings proportional to winning chances
    //draw - 10,9 - -1,87 0, 6543 +1, 21 +2 substraction is from lowest rated team

    //returns arr of form [{hometeam:{team:'Arsenal',rating:8},awayteam:{team:'Man Utd',rating:8}}]
    const teamsToMatchTogether = teams.map((team)=>{
        const randTeam = ()=>{
        const randomTeam = teams[Math.floor(Math.random()*teams.length)]
        const index = teams.findIndex((tm)=>tm.team === randomTeam.team)
        teams.splice(index,1)
        return randomTeam
        }
        const hometeam = randTeam()
        const awayteam = randTeam()
        return {hometeam,awayteam}
    })
    //[{hometeam:{team:'Arsenal',rating:8},awayteam:{team:'Man Utd',rating:8}}]
    const teamsWithOdds = (teamsToBeMatched)=>{
//push arrs of form [{name: 'main',match: match1,'1': '2.30','X': '3.40','2': '2.90','1X': '1.40','12': '1.33','X2': '1.56'},{name: 'gg_ng',match: match1,gg: '1.65',ng: '2.46' },etc] to epl_vals
//returned arr is of form [ [{},{}], [{},{}], etc ]
        const arrOfAllOdds = []
        const{
            main,
            gg,
            ou1p5,
            ou2p5,
            ou3p5,
            ou4p5,
            redCard,
            penalty,
            conerou8p5,
            conerou11p5,
            winEither,
            winBoth,
            ou1p5Home,
            ou1p5Away,
            ou0p5Home,
            ou0p5Away
        } = tempData

        teamsToBeMatched.forEach((tmsObj)=>{
            //{team:'Arsenal',rating:8}
          const{hometeam,awayteam} = tmsObj
          const oddsArr = []
          const ratingsArr = []
          const ratingsDiff = hometeam.rating - awayteam.rating

          if(Math.sign(ratingsDiff) === 1){
            const hmTeam = {...hometeam}
            const awTeam = {...awayteam}
            const drawCount = Math.floor((hmTeam.rating + awTeam.rating)/2) 

            if(awTeam.rating === 1){
                hmTeam.rating+=2
            }
            else{
                hmTeam.rating++
                awTeam.rating--          
            }

            const allRatings = hmTeam.rating + awTeam.rating + drawCount

            for (let i = 0; i < allRatings; i++) {

                if(i<=hmTeam.rating){
                    ratingsArr.push("home")
                }
                else if(i<=(hmTeam.rating + awTeam.rating)){
                    ratingsArr.push("away")
                }
                else{
                    ratingsArr.push("draw")
                }
                
            }

const main1 = {...main}
main1.match = `${hmTeam.team} vs ${awTeam.team}`
main1['1'] 















          }
        })
    }
 }
 
 function getMatches(teams,games){
     const arrOfTeams = teams.slice()
    if(games.length !== 0){
        //this means there are games that haven't been set yet from the front end
        if(games.length !== teams.length/2){
          
          games.forEach((game)=>{
            const homeTeamIndex = arrOfTeams.findIndex((teamObj)=>teamObj.team === game.homeTeam)
            //remove existing team that has its match set
            arrOfTeams.splice(homeTeamIndex,1)
            const awayTeamIndex = arrOfTeams.findIndex((teamObj)=>teamObj.team === game.awayTeam)
            //remove existing team that has its match set
            arrOfTeams.splice(awayTeamIndex,1)
          }) 

          //whatever teams are left in arrOfTeams are the ones not set from frontend
        
        }
        //this means all games have been set from the frontend
        else{
            //remember to pass in arrOfTeams, not teams
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
       getMatches(teams,games)
    }
    else if(secondTier){
        const{teams,games} = leagueArr[1]
        getMatches(teams,games)
    }
    else if(thirdTier){
        const{teams,games} = leagueArr[2]
        getMatches(teams,games)
    }
    else if(fourthTier){
        const{teams,games} = leagueArr[3]
        getMatches(teams,games)
    }
 }
 
 function fetchMatchesWithOdds(country,league,allCountries){
    switch(country){
        case 'England':
            const englishLeagues = allCountries[0]
            switch(league){
               case 'EPL':
                   getLeaguesWithOdds(league,englishLeagues)
                    break
               case 'Championship':
                   getLeaguesWithOdds(league,englishLeagues)
                   break
               case 'League 1':
                   getLeaguesWithOdds(league,englishLeagues)
                   break
               case 'League 2':
                   getLeaguesWithOdds(league,englishLeagues)
                   break
               default:
                   console.log(league)  
            }
            break

        case 'Spain':
            const spanishLeagues = allCountries[1]
            switch(league){
               case 'La Liga':
                   getLeaguesWithOdds(league,spanishLeagues)
                   break
               case 'La Liga2':
                   getLeaguesWithOdds(league,spanishLeagues)
                   break
               case 'Segunda B':
                   getLeaguesWithOdds(league,spanishLeagues)
                   break    
               default:
                   console.log(league)
            }
            break

        case 'Germany':
            const germanLeagues = allCountries[2]
            switch(league){
               case '1.Bundesliga':
                   getLeaguesWithOdds(league,germanLeagues)
                   break
               case '2.Bundesliga':
                   getLeaguesWithOdds(league,germanLeagues)
                   break
               case '3.Liga':
                   getLeaguesWithOdds(league,germanLeagues)
                   break
               default:
                   console.log(league)
            }
            break

        case 'Italy':
            const italianLeagues = allCountries[3]
            switch(league){
               case 'Serie A':
                   getLeaguesWithOdds(league,italianLeagues)
                   break 
               case 'Serie B':
                   getLeaguesWithOdds(league,italianLeagues)
                   break
               case 'Serie C': 
                   getLeaguesWithOdds(league,italianLeagues)
                   break 
               default:
                   console.log(league)
                
            }
            break
        default:
            console.log(country)    
        }
}

module.exports = fetchMatchesWithOdds