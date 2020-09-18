import displayData from './displayData'
import * as arrs from '../BetData/betData'
import extractData from './extractData'

const{arr_vals,arr_ids} = arrs

const selectLeagueRunner = (league,country)=>{
    const disp = document.getElementById('display')

    if (disp.hasChildNodes()) {
      const children = Array.from(disp.children)
      for (const ch of children) {
          if(ch.id === `${league}Wrapper`){
            disp.removeChild(ch)
          }
      }
    }

    const leagueBetOptions = document.createElement('div')
    leagueBetOptions.id = `${league}Display`

    for (let i = 0; i < arr_ids.length; i++) {
      const myDiv = document.createElement('div')
      myDiv.setAttribute('id', arr_ids[i])
      myDiv.setAttribute('class', 'style_divs')
      myDiv.textContent = arr_vals[i]
      if (myDiv.id === 'main') {
        myDiv.setAttribute('style', 'background-color:rgb(84, 3, 160)')
      }
      leagueBetOptions.appendChild(myDiv)
    }

    const extracted_array = extractData(country,league)
    const leagueDiv = document.createElement('div')
    leagueDiv.setAttribute('id',`${league}Wrapper`)
    leagueDiv.appendChild(leagueBetOptions)
    disp.appendChild(leagueDiv)
    //display data on page
    displayData(disp,leagueDiv,extracted_array)
}

export default function(country,league){

    switch(country){

        case 'England':
            switch(league){
                case 'epl':
                    selectLeagueRunner(league,country)
                    break
                case 'championship':
                    selectLeagueRunner(league,country)
                    break
                case 'league1':
                    selectLeagueRunner(league,country)
                    break
                case 'league2':
                    selectLeagueRunner(league,country)
                    break
            }
            break
        case 'Spain':
            switch(league){
                case 'laliga':
                    selectLeagueRunner(league,country)
                    break
                case 'laliga2':
                    selectLeagueRunner(league,country)
                    break
                case 'segundab':
                    selectLeagueRunner(league,country)
                    break
            }
            break
        case 'Germany':
            switch(league){
                case '1.bundesliga':
                    selectLeague(league,country)
                    break
                case '2.bundesliga':
                    selectLeague(league,country)
                    break
                case '3.liga':
                    selectLeague(league,country)
                    break
            }
            break
        case 'Italy':
            switch(league){
                case 'seriea':
                    selectLeague(league,country)
                    break
                case 'serieb':
                    selectLeague(league,country)
                    break
                case 'seriec':
                    selectLeague(league,country)
                    break
            }
            break
    }
}