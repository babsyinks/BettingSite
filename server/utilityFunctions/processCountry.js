const processLeague = require("./processLeague")

const processCountry = (country,countryArr,matchObject,league,fn)=>{
    let team = ''
    switch(country){

        case 'England':
          team = processLeague(countryArr[0],matchObject,league,fn)
           break
        case 'Spain':
           team = processLeague(countryArr[1],matchObject,league,fn)
            break
        case 'Germany':
           team = processLeague(countryArr[2],matchObject,league,fn)
            break
        case 'Italy':
           team = processLeague(countryArr[3],matchObject,league,fn)
            break
        default:
            console.log(country)
    }
    return team
}

module.exports = processCountry