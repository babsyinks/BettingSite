const {IndividualLeagues,Leagues} = require('../model/model.js')

const createLeagues = (teamRating,leagueObj)=>{

    const countryLeagues = []
    let countryLeaguesInstancesArray = []
    // example = [eplArray, championshipArray,league1Array,league2Array]
    const arrayKeys = Object.keys(leagueObj) 

            //array of form ['10','9','8','7','6']
            const teamRatingKeys = Object.keys(teamRating) 
            arrayKeys.forEach((division)=>{

                //array of obj of form [{team,rating}] will be returned to lg
               let lg = leagueObj[division].map((team)=>{
                    
                        let val = null
                        for (let key of teamRatingKeys) {
                            if(teamRating[key].includes(team)){
                                val = {team,rating:+key}
                                break
                       } 
                    }

                   if(!val){
                      const randNum = Math.floor(Math.random()*3) + 1
                      val = {team,rating:randNum}
                   }

                   return val
                })

                countryLeagues.push(lg)

                        countryLeaguesInstancesArray = countryLeagues.map((lgArray)=>{
                    return new IndividualLeagues({teams:lgArray,games:[]})
                })
            })

            return new Leagues({leagues:countryLeaguesInstancesArray})

}

module.exports = createLeagues