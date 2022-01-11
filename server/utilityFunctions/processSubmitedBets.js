const processSubmitedBets = (arrOfResults)=>{
    return arrOfResults.map((matchObj)=>{
        const calculatedResult = getResults(matchObj)
        return resultForMainAndGoals(matchObj,calculatedResult)
    })
}   
const generateRandomNumber = (length)=>{
        return Math.floor(Math.random()*length)
    }
//gets calculated match results
const getResults = (matchObj)=>{
    const{rating} = matchObj

    let[homeRating,awayRating] = rating.split('-')

    homeRating = +homeRating
    awayRating = +awayRating

    const drawRating = Math.floor((homeRating + awayRating)/2) - 1

    const homeArr = new Array(homeRating).fill('home')
    const awayArr = new Array(awayRating).fill('away')
    const drawArr = new Array(drawRating).fill('draw')
    const allRatingsArr = [...homeArr,...awayArr,...drawArr]
 
    const randIndex = generateRandomNumber(allRatingsArr.length)
    const outcome = allRatingsArr[randIndex]

    const mostCommonResultArr = [0,1,2,3,4,5,6,7]

    const ratingsDifference = Math.abs(homeRating - awayRating)

    const addChancesOfUncommonResults = (resultsObj)=>{
        let{home,away} = resultsObj
        const randNum = generateRandomNumber(11)
        if(randNum === 9){
            home++
            away++
        }
        else if(randNum === 10){
            home+=2
            away+=2
        }
        return {home,away}
    }
        //this returns calculated results of home and away teams
    const calculateResults = (index1,index2)=>{
        const resultsObj = {}
        if(outcome === 'home'||outcome === 'away'){
            const winnerGoalsArr = mostCommonResultArr.slice(index1,index2)
            const winnerGoal = winnerGoalsArr[generateRandomNumber(winnerGoalsArr.length)]
            const loserGoalsArr = mostCommonResultArr.slice(--index1,--index2)
            const loserGoal = loserGoalsArr[generateRandomNumber(winnerGoal)]

            if(outcome === 'home'){
                resultsObj.home = winnerGoal
                resultsObj.away = loserGoal
            }
            else{
                resultsObj.home = loserGoal
                resultsObj.away = winnerGoal
            }
        }
        else{
            const drawGoalsArr = mostCommonResultArr.slice(0,4)
            const drawGoal = drawGoalsArr[generateRandomNumber(drawGoalsArr.length)]
            resultsObj.home = drawGoal
            resultsObj.away = drawGoal
        }
        return addChancesOfUncommonResults(resultsObj)
        
    }
    let finalResults
    switch (ratingsDifference) {
        case 0:
        case 1:
            finalResults = calculateResults(1,4)
            break
        case 2:
        case 3:
            finalResults = calculateResults(1,5)
            break
        case 4:
        case 5:
        case 6:
        case 7:
            finalResults = calculateResults(1,6)
            break
        case 8:
            finalResults = calculateResults(1,7)
            break
        case 9:
            finalResults = calculateResults(1,8)
            break
        default:
            break;
    }
    return finalResults
}

const resultForMainAndGoals = (matchObj,calculatedResult)=>{
    const{match,result:submittedResult,category} = matchObj
    const{home,away} = calculatedResult
    let betWon
    const outputMatchResult = (homeResult,awayResult)=>{
       return match.split(' vs ').reduce((acc,val,i)=>{
            if(i ===0){
               return val + ' ' + acc + ' - ' 
            }
            else{
                return acc + awayResult + ' ' + val
            }
            
        },homeResult)
    }

    const finalResult = outputMatchResult(home,away)

    const handleOverAndUnderGoals = (goals)=>{
        const goalsSum = home + away
        switch(submittedResult){
            case 'OV':
                betWon = goalsSum>goals
                break
            case 'UN':
                betWon = goalsSum<goals
                break
            default:
                break
        }
    }

    const handleHomeAndAwayOverAndUnderGoals = (goals,venue)=>{
        let goalsToCheck
        if(venue === 'home'){
            goalsToCheck = home
        }
        else{
            goalsToCheck = away
        }
        switch(submittedResult){
            case 'OV':
                betWon = goalsToCheck > goals
                break
            case 'UN':
                betWon = goalsToCheck < goals
                break
            default:
                break
        }
    }

    const handleRedcardOrPenalty = (val)=>{
        let arr
        let result
        if(val === 'redCard'){
            arr = new Array(11)
            arr.fill('yes',0,3)
            arr.fill('no',3)
            result = arr[generateRandomNumber(arr.length)]
        }
        else{
            const adMixture = [true,false][generateRandomNumber(2)]
            const arrLength = 12 + (adMixture?1:0)
            arr = new Array(arrLength)
            arr.fill('no',0,9)
            arr.fill('yes',9)
            result = arr[generateRandomNumber(arr.length)]
        }
        switch(submittedResult){
            case 'YES':
                betWon = result === 'yes'
                break
            case 'NO':
                betWon = result === 'no'
            default:
                break
        }
    }

    const handleOverUnderCorner = (val)=>{
        let arr
        let result
        if(val === '8.5'){
            arr = new Array(12)
            arr.fill('over',0,5)
            arr.fill('under',5)
            result = arr[generateRandomNumber(arr.length)]
        }
        else{
            arr = new Array(12)
            arr.fill('under',0,7)
            arr.fill('over',7)
            result = arr[generateRandomNumber(arr.length)]
        }
        switch(submittedResult){
            case 'OV':
                betWon = result === 'over'
                break
            case 'UN':
                betWon = result === 'under'
            default:
                break
        }
    }

    const handleWinBothOrWinEitherHalves = (val)=>{
        const generatePossibleResults = (noOfGoals)=>{
            const arr = []
            for (let i = 0; i <= noOfGoals; i++) {
                arr.push(i);
            }
            return arr
        }
        const firstHalfHome = generatePossibleResults(home)[generateRandomNumber(home+1)]
        const secondHalfHome = home - firstHalfHome
        const firstHalfAway = generatePossibleResults(away)[generateRandomNumber(away+1)]
        const secondHalfAway = away - firstHalfAway

        if(val === 'both'){
            switch(submittedResult){
                case '1':
                    betWon = firstHalfHome>firstHalfAway && secondHalfHome >secondHalfAway
                    break
                case '2':
                    betWon = firstHalfAway > firstHalfHome && secondHalfAway > secondHalfHome
                    break
                default:
                    break
            } 
        }
        else{
            switch(submittedResult){
                case '1':
                    betWon = firstHalfHome>firstHalfAway || secondHalfHome >secondHalfAway
                    break
                case '2':
                    betWon = firstHalfAway > firstHalfHome || secondHalfAway > secondHalfHome
                    break
                default:
                    break  
            }
        }
        const firstHalf = outputMatchResult(firstHalfHome,firstHalfAway)
        const secondHalf = outputMatchResult(secondHalfHome,secondHalfAway)
        return {
            betWon,finalResult,submittedResult,firstHalf,secondHalf,category
        }

    }

    if(category === 'main'){
        switch(submittedResult){
            case '1':
                betWon = home>away
                break
            case 'X':
                betWon = home === away
                break
            case '2':
                betWon = away>home
                break
            case '1X':
                betWon = home>away||home === away
                break
            case 'X2':
                betWon = home ===away||away>home
                break
            case '12':
                betWon = home>away||away>home
                break
            default:
                break
        }
    }
    else if(category === 'gg'){
        switch(submittedResult){
            case 'GG':
                betWon = home>0 && away>0
                break
            case 'NG':
                betWon = !(home>0 && away>0)
                break
            default:
                break

        }
    }
    else if(category === 'ou1p5'){
        handleOverAndUnderGoals(1.5)
    }
    else if(category === 'ou2p5'){
        handleOverAndUnderGoals(2.5)
    }
    else if(category === 'ou3p5'){
        handleOverAndUnderGoals(3.5)
    }
    else if(category === 'ou4p5'){
        handleOverAndUnderGoals(4.5)
    }
    else if(category === 'ou1p5Home'){
        handleHomeAndAwayOverAndUnderGoals(1.5,'home')
    }
    else if(category === 'ou1p5Away'){
        handleHomeAndAwayOverAndUnderGoals(1.5,'away')
    }
    else if(category === 'ou0p5Home'){
        handleHomeAndAwayOverAndUnderGoals(0.5,'home')
    }
    else if(category === 'ou0p5Away'){
        handleHomeAndAwayOverAndUnderGoals(0.5,'away')
    }
    else if(category === 'redCard'){
        handleRedcardOrPenalty('redCard')
    }
    else if(category === 'penalty'){
        handleRedcardOrPenalty('penalty')
    }
    else if(category === 'conerou8p5'){
        handleOverUnderCorner('8.5')
    }
    else if(category === 'conerou11p5'){
        handleOverUnderCorner('11.5') 
    }
    else if(category === 'winEither'){
        return handleWinBothOrWinEitherHalves('either')
    }
    else if(category === 'winBoth'){
        return handleWinBothOrWinEitherHalves('both')
    }
    return {
        betWon,finalResult,submittedResult,category
    }
}

module.exports = processSubmitedBets
