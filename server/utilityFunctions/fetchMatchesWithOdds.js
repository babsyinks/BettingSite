const tempData = require('../data/dataTemp')
const calculateOdds = require('./setOdds')

function assignGamesWithOdds(teams){
    //ratings 5 and above high chance of high scores
    //ratings 4 below low chance of high scores
    //ratings proportional to winning chances
    //draw - 10,9 - -1,87 0, 6543 +1, 21 +2 substraction is from lowest rated team

    //returns arr of form [{hometeam:{team:'Arsenal',rating:8},awayteam:{team:'Man Utd',rating:8}}]
    const teamsCopy = teams.slice()
    
    const randTeam = ()=>{
        const randomTeam = teamsCopy[Math.floor(Math.random()*teamsCopy.length)]
        const index = teamsCopy.findIndex((tm)=>tm.team === randomTeam.team)
        teamsCopy.splice(index,1)
        return randomTeam
        }
    const teamsToMatchTogether = teams.map((team)=>{
        const hometeam = randTeam()
        const awayteam = randTeam()
        return {hometeam,awayteam}
    })
    .filter((tm)=>tm.hometeam!==undefined)
    
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
          const ratingsDiff = hometeam.rating - awayteam.rating

          const {
            main:mainOdds,
            gg:ggOdds,
            ou1p5:ou1p5Odds,
            ou2p5:ou2p5Odds,
            ou3p5:ou3p5Odds,
            ou4p5:ou4p5Odds,
            redCard:redCardOdds,
            penalty:penaltyOdds,
            conerou8p5:conerou8p5Odds,
            conerou11p5:conerou11p5Odds,
            winEither:winEitherOdds,
            winBoth:winBothOdds,
            ou1p5Home:ou1p5HomeOdds,
            ou1p5Away:ou1p5AwayOdds,
            ou0p5Home:ou0p5HomeOdds,
            ou0p5Away:ou0p5AwayOdds
        } = calculateOdds(ratingsDiff,hometeam.rating,awayteam.rating)

          if(Math.sign(ratingsDiff) === 1){

            if(awayteam.rating === 1){
                hometeam.rating+=2
            }
            else{
                hometeam.rating++
                awayteam.rating--          
            }

            }
          else if(Math.sign(ratingsDiff) === -1){

            if(hometeam.rating === 1){
                    awayteam.rating+=2
            }
            else{
                    hometeam.rating++
                    awayteam.rating--          
            }
            }
            else{
                hometeam.rating++
                awayteam.rating--  
            }

            const match = `${hometeam.team} vs ${awayteam.team}`

            main.match = match
            
            main['1'] = mainOdds.one
            main['2'] = mainOdds.two
            main['X'] = mainOdds.x
            main['1X'] = mainOdds.onex
            main['12'] = mainOdds.onetwo
            main['X2'] = mainOdds.xtwo

            gg.match = match
            gg.gg = ggOdds.gg
            gg.ng = ggOdds.ng

            ou1p5.match = match
            ou1p5.ov = ou1p5Odds.ov
            ou1p5.un = ou1p5Odds.un

            ou2p5.match = match
            ou2p5.ov = ou2p5Odds.ov
            ou2p5.un = ou2p5Odds.un

            ou3p5.match = match
            ou3p5.ov = ou3p5Odds.ov
            ou3p5.un = ou3p5Odds.un

            ou4p5.match = match
            ou4p5.ov = ou4p5Odds.ov
            ou4p5.un = ou4p5Odds.un

            redCard.match = match
            redCard.yes = redCardOdds.yes
            redCard.no = redCardOdds.no

            penalty.match = match
            penalty.yes = penaltyOdds.yes
            penalty.no = penaltyOdds.no

            conerou8p5.match = match
            conerou8p5.ov = conerou8p5Odds.ov
            conerou8p5.un = conerou8p5Odds.un

            conerou11p5.match = match
            conerou11p5.ov = conerou11p5Odds.ov
            conerou11p5.un = conerou11p5Odds.un

            winEither.match = match
            winEither['1'] = winEitherOdds.one
            winEither['2'] = winEitherOdds.two

            winBoth.match = match
            winBoth['1'] = winBothOdds.one
            winBoth['2'] = winBothOdds.two

            ou1p5Home.match = match
            ou1p5Home.ov = ou1p5HomeOdds.ov
            ou1p5Home.un = ou1p5HomeOdds.un

            ou1p5Away.match = match
            ou1p5Away.ov = ou1p5AwayOdds.ov
            ou1p5Away.un = ou1p5AwayOdds.un

            ou0p5Home.match = match
            ou0p5Home.ov = ou0p5HomeOdds.ov
            ou0p5Home.un = ou0p5HomeOdds.un

            ou0p5Away.match = match
            ou0p5Away.ov = ou0p5AwayOdds.ov
            ou0p5Away.un = ou0p5AwayOdds.un

          arrOfAllOdds.push(main,gg,ou1p5,ou2p5,ou3p5,ou4p5,redCard,penalty,conerou8p5,conerou11p5,winEither,winBoth,ou1p5Home,ou1p5Away,ou0p5Home,ou0p5Away)
        })
        return arrOfAllOdds
    }
    return teamsWithOdds(teamsToMatchTogether)
 }

 function getMatches(teams,games){
     let arrOfOdds
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
          arrOfOdds = assignGamesWithOdds(arrOfTeams)
        }
        //this means all games have been set from the frontend
        else{
            //remember to pass in arrOfTeams, not teams
            return games
        }
    }
    else{
        arrOfOdds = assignGamesWithOdds(arrOfTeams)
    }
    return arrOfOdds
 }
 
 function getLeaguesWithOdds(league,countryObj){
    const topTier = league === 'EPL'||league === 'La Liga'||league === '1.Bundesliga'||league ==='Serie A'
    const secondTier = league === 'Championship'||league === 'La Liga2' ||league === '2.Bundesliga'||league === 'Serie B'
    const thirdTier = league === 'League 1'||league === 'Segunda B'||league === '3.Liga'||league === 'Serie C'
    const fourthTier = 'League 2'
    const leagueArr = countryObj.leagues
    let arrOfOdds

    if(topTier){
       const{teams,games} = leagueArr[0]
       arrOfOdds = getMatches(teams,games)
    }
    else if(secondTier){
        const{teams,games} = leagueArr[1]
        arrOfOdds = getMatches(teams,games)
    }
    else if(thirdTier){
        const{teams,games} = leagueArr[2]
        arrOfOdds = getMatches(teams,games)
    }
    else if(fourthTier){
        const{teams,games} = leagueArr[3]
        arrOfOdds = getMatches(teams,games)
    }
    return arrOfOdds
 }
 
 function fetchMatchesWithOdds(country,league,allCountries){
     let arrOfOdds
    switch(country){
        case 'England':
            const englishLeagues = allCountries[0]
            switch(league){
               case 'EPL':
                arrOfOdds = getLeaguesWithOdds(league,englishLeagues)
                    break
               case 'Championship':
                arrOfOdds = getLeaguesWithOdds(league,englishLeagues)
                   break
               case 'League 1':
                arrOfOdds = getLeaguesWithOdds(league,englishLeagues)
                   break
               case 'League 2':
                arrOfOdds = getLeaguesWithOdds(league,englishLeagues)
                   break
               default:
                   console.log(league)  
            }
            break

        case 'Spain':
            const spanishLeagues = allCountries[1]
            switch(league){
               case 'La Liga':
                arrOfOdds = getLeaguesWithOdds(league,spanishLeagues)
                   break
               case 'La Liga2':
                arrOfOdds = getLeaguesWithOdds(league,spanishLeagues)
                   break
               case 'Segunda B':
                arrOfOdds = getLeaguesWithOdds(league,spanishLeagues)
                   break    
               default:
                   console.log(league)
            }
            break

        case 'Germany':
            const germanLeagues = allCountries[2]
            switch(league){
               case '1.Bundesliga':
                arrOfOdds = getLeaguesWithOdds(league,germanLeagues)
                   break
               case '2.Bundesliga':
                arrOfOdds = getLeaguesWithOdds(league,germanLeagues)
                   break
               case '3.Liga':
                arrOfOdds = getLeaguesWithOdds(league,germanLeagues)
                   break
               default:
                   console.log(league)
            }
            break

        case 'Italy':
            const italianLeagues = allCountries[3]
            switch(league){
               case 'Serie A':
                arrOfOdds = getLeaguesWithOdds(league,italianLeagues)
                   break 
               case 'Serie B':
                arrOfOdds = getLeaguesWithOdds(league,italianLeagues)
                   break
               case 'Serie C': 
               arrOfOdds = getLeaguesWithOdds(league,italianLeagues)
                   break 
               default:
                   console.log(league)
                
            }
            break
        default:
            console.log(country)    
        }
        return arrOfOdds
}

module.exports = fetchMatchesWithOdds