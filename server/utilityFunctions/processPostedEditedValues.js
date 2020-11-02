const processCountry = require('./processCountry')

const insertEditedValues = (arr,matchObj)=>{
    const gameIndex = arr.games.findIndex((gameObj)=>gameObj.homeTeam === matchObj.homeTeam && gameObj.awayTeam === matchObj.awayTeam)
    
    if(gameIndex !== -1){
        arr.games.splice(gameIndex,1,matchObj)
    }
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
    processCountry(country,countryArr,matchObject,league,insertEditedValues)
    return countryArr
}

module.exports = processMatch