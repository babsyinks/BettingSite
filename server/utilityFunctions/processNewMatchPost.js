const processCountry = require('./processCountry.js')

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
