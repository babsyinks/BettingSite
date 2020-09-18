const processCountry = require('./processCountry')

const getObjectToEdit = (arr,matchObj)=>{
    
   return arr.games.find((gameObj)=>{
        return gameObj.homeTeam === matchObj.homeTeam && gameObj.awayTeam === matchObj.awayTeam
    })
}

const processEditMatch = (editObj,countryArr)=>{
    const{country,league} = editObj
    return processCountry(country,countryArr,editObj,league,getObjectToEdit)
}


module.exports = processEditMatch