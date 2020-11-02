const processCountry = require('./processCountry')

const checkAndPushToArray = (arr,matchObj)=>{
    let existingTeam = ''
    const gameExists = arr.games.find((gameObj)=>{

        if(gameObj.homeTeam === matchObj.homeTeam||gameObj.homeTeam === matchObj.awayTeam ){
            existingTeam = gameObj.homeTeam
            return true
        }
        else if(gameObj.awayTeam === matchObj.homeTeam|| gameObj.awayTeam === matchObj.awayTeam){
            existingTeam = gameObj.awayTeam
            return true
        }
        else{
             return false
        }
          
    })
    
    if(gameExists){
        return existingTeam
    }
    arr.games.push(matchObj)
    return existingTeam
}

const processMatch = (matchObj,countryArr)=>{
    const{country,league} = matchObj
    const matchObject = {}
    for (const key in matchObj) {
       let parsedVal = parseFloat(matchObj[key])
       if(!Number.isNaN(parsedVal)){
            matchObject[key] = matchObj[key]
       }
       else{
           if(key === "homeTeam"||key === "awayTeam"){
               matchObject[key] = matchObj[key]
           }
           else{
               matchObject[key] = "1.50"
           }
           
       }
    }
    const isExistingTeam = processCountry(country,countryArr,matchObject,league,checkAndPushToArray)
    if(isExistingTeam){
        return isExistingTeam
    }
    return countryArr
}

module.exports = processMatch
/* 
{ one: '1.1',
  x: '2',
  two: '2',
  oneX: '2',
  oneTwo: '3',
  xTwo: '3',
  over2pt5: '2',
  under2pt5: '5',
  over1pt5: '6',
  under1pt5: '7',
  over3pt5: '7',
  under3pt5: '4',
  over4pt5: '5',
  under4pt5: '8',
  redcardYes: '8',
  redcardNo: '6',
  penaltyYes: '4',
  penaltyNo: '3',
  cornerOver8pt5: '3',
  cornerUnder8pt5: '4',
  cornerOver11pt5: '6',
  cornerUnder11pt5: '7',
  gg: '3',
  ng: '5',
  homeTeam: 'Arsenal',
  awayTeam: 'Aston Villa',
  country: 'England',
  league: 'EPL' } */