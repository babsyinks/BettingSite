const processCountry = require('./processCountry')

const deleteGame = (arr,matchObj)=>{
   // arr = arr.games.filter((gameObj)=>gameObj.homeTeam === matchObj.homeTeam && gameObj.awayTeam === matchObj.awayTeam)
  const index = arr.games.findIndex((gameObj)=>gameObj.homeTeam === matchObj.homeTeam && gameObj.awayTeam === matchObj.awayTeam)
  if(index !== -1){
    arr.games.splice(index,1)
  }
  else{
      return `${matchObj.homeTeam} vs ${matchObj.awayTeam} has not been added yet`
  } 
  
}

const processMatch = (matchObj,countryArr)=>{
    const{country,league} = matchObj
    const result = processCountry(country,countryArr,matchObj,league,deleteGame)
    if(result){
        return result
    }
    return countryArr
}

module.exports = processMatch