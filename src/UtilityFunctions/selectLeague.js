import displayData from './displayData.js'
import * as arrs from '../BetData/betData.js'
import extractData from './extract_Data.js'

const{arr_vals,arr_ids} = arrs

const selectLeagueRunner = async (league,country)=>{
    const disp = document.getElementById('display')

    if (disp.hasChildNodes()) {
      const children = Array.from(disp.children)
      for (const ch of children) { 
          if(ch.id === `${league}Wrapper`){  
            disp.removeChild(ch)
          }
      }
      const headerforBetChamp = document.getElementById('betChampHeader')
      const imgForBetChamp = document.getElementById('betChamp')

      if(headerforBetChamp && imgForBetChamp){
        disp.removeChild(headerforBetChamp)
        disp.removeChild(imgForBetChamp)
      }

        const calculateDiv = document.getElementById('calculate')
        const baller = document.getElementById('baller')
        if(baller){
            calculateDiv.removeChild(baller)
        }
         

    }

    const leagueBetOptions = document.createElement('div')
    leagueBetOptions.id = `${league}Display`
    leagueBetOptions.className = 'display_league'
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

    const createReadableLabel = (label)=>{
        if(label === 'epl'){
            return 'english premier league'
        }
        if(country!=="Germany"){

            const filter1 = ['laliga','laliga2']
            const filter2 = ["segundab","league2","league1","seriea","serieb","seriec"]

            if(filter1.includes(label)){
               const leagueArr = label.split("")
               label = leagueArr.reduce((acc,val)=>{
                    if(val === "a"){
                        val = "a "
                    }
                    if(val === "2"){
                        val === " 2"
                    }
                    return acc + val
                },'')
            }
            
            if(filter2.includes(label)){
                const leagueArr = label.split("")
                label = leagueArr.reduce((acc,val)=>{
                    if(leagueArr[leagueArr.length-1] === val){
                        val = ` ${val}`
                    }
                    return acc + val
                },'')
            }
        }
        return label
    }

    const {odds:extracted_array,ratings} = await extractData(country,league)
    const leagueDiv = document.createElement('div')
    leagueDiv.setAttribute('id',`${league}Wrapper`)
    const leagueLabel = document.createElement('div')
    leagueLabel.setAttribute('class','league_label')
    const leagueText = createReadableLabel(league)
    leagueLabel.textContent = `${country} - ${leagueText}`
    leagueDiv.appendChild(leagueLabel)
    leagueDiv.appendChild(leagueBetOptions)
    disp.appendChild(leagueDiv)   
    
   
    
    
    //display data on page
    displayData(disp,leagueDiv,extracted_array,league,ratings)
    const calculateDiv = document.getElementById('calculate')
    if(calculateDiv.childElementCount === 0){

        const calculateDiv = document.getElementById('calculate')
        const msgDiv = document.createElement('div')

        msgDiv.textContent = `Pick odds from the various matches on the left.There are multiple events to choose odds
        from.The most recently selected odd for a match will override the previously selected odd.The minimum and maximum acceptable 
        bet amounts are $1 and $1,000,000 respectively.The maximum possible win is $1,000,000,000.`
        
        msgDiv.id = 'msgDiv'
        calculateDiv.appendChild(msgDiv)

    }

    
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
                    selectLeagueRunner(league,country)
                    break
                case '2.bundesliga':
                    selectLeagueRunner(league,country)
                    break
                case '3.liga':
                    selectLeagueRunner(league,country)
                    break
            }
            break
        case 'Italy':
            switch(league){
                case 'seriea':
                    selectLeagueRunner(league,country)
                    break
                case 'serieb':
                    selectLeagueRunner(league,country)
                    break
                case 'seriec':
                    selectLeagueRunner(league,country)
                    break
            }
            break
    }
}