import toCurrency from './displayInCurrencyFormat.js'
//this calaculates the bonus that will added to the bet amount
    export function calculateBonus(oddsTotal,numOfMatches,amount){
        let bonus
        amount = +amount
        const returnBonusValue = (multiplier)=>(multiplier*oddsTotal*amount)/100
        if(numOfMatches<4){
          bonus = 0
        }
        else if(numOfMatches === 4){
          bonus = returnBonusValue(5)
        }
        else if(numOfMatches >= 36){
          bonus = returnBonusValue(160)
        }
        else{
          const oddsDiff = numOfMatches - 4
          const derivedMultiplier = (oddsDiff*5) + 5
          bonus = returnBonusValue(derivedMultiplier)
        }
        return bonus
      }

      export function reCalculateOdds(){
        const selectedMatchesCount = Array.from(document.getElementsByClassName('selectedMatches')).length
  
        const totalOdds = Array.from(document.getElementsByClassName('odds'))
        .map((elem)=>+elem.textContent)
        .reduce((acc,val)=>acc*val,1)
  
        const oddsVal = document.getElementById('oddsVal') 
        oddsVal.textContent = toCurrency(totalOdds.toFixed(2)) 
  
        const inputVal = document.getElementById('amountInput').value
  
        const bonusVal = document.getElementById('bonusVal')
      
        const bonusValue = calculateBonus(totalOdds,selectedMatchesCount,inputVal)
        bonusVal.textContent = toCurrency(bonusValue.toFixed(2)) 
  
        const potentialWinVal = document.getElementById('potentialWinVal')
        potentialWinVal.textContent = toCurrency(((totalOdds*inputVal) + bonusValue).toFixed(2)) 
  
        const calculateHeader = document.getElementById('calculateHeader')
  
        calculateHeader.textContent = `Betslip   Selections:${selectedMatchesCount}`
        if(selectedMatchesCount === 0){
          const calculateDiv = document.getElementById('calcContainer')
          calculateDiv.removeChild(calculateHeader)
          calculateDiv.removeChild(document.getElementById('calculationInfo'))
        }
      }

      