const processSubmitedBets = (arrOfResults)=>{

}

const getResults = (matchObj)=>{
    const{rating} = matchObj

    const[homeRating,awayRating] = rating.split('-')

    const drawRating = Math.floor((homeRating + awayRating)/2) - 1

    const homeArr = new Array(homeRating).fill('home')
    const awayArr = new Array(awayRating).fill('away')
    const drawArr = new Array(drawRating).fill('draw')
    const allRatingsArr = [...homeArr,...awayArr,...drawArr]
    const generateRandomNumber = (length)=>{
        return Math.floor(Math.random()*length)
    }
    const randIndex = generateRandomNumber(allRatingsArr.length)
    const outcome = allRatingsArr[randIndex]

    const mostCommonResultArr = [0,1,2,3,4,5,6,7]

    const ratingsDifference = Math.abs(homeRating - awayRating)

    const addChancesOfUncommonResults = (resultsObj)=>{
        const{home,away} = resultsObj
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

    const calculateResults = (index1,index2)=>{
        const winnerGoalsArr = [...mostCommonResultArr.slice(index1,index2)]
        const winnerGoal = winnerGoalsArr[generateRandomNumber(winnerGoalsArr.length)]
        const loserGoalsArr = [...mostCommonResultArr.slice(index1--,index2--)]
        const loserGoal = loserGoalsArr[generateRandomNumber(winnerGoal)]
        const drawGoalsArr = [...mostCommonResultArr.slice(0,4)]
        const drawGoal = drawGoalsArr[generateRandomNumber(drawGoalsArr.length)]
        const resultsObj = {}
        if(outcome === 'home'){
            resultsObj.home = winnerGoal
            resultsObj.away = loserGoal
        }
        else if(outcome === 'away'){
            resultsObj.home = loserGoal
            resultsObj.away = winnerGoal
        }
        else{
            resultsObj.home = drawGoal
            resultsObj.away = drawGoal
        }
        return addChancesOfUncommonResults(resultsObj)
        
    }
    let finalResults
    switch (ratingsDifference) {
        case 0,1:
            finalResults = calculateResults(1,4)
            break;
        case 2,3:
            finalResults = calculateResults(1,5)
            break
        case 4,5,6,7:
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
    const finalResult = match.split(' vs ').reduce((acc,val,i)=>{
        if(i ===0){
           return val + ' ' + acc + ' - ' 
        }
        else{
            return acc + away + ' ' + val
        }
        
    },home)

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
    return {
        betWon,finalResult,submittedResult
    }
}

module.exports = processSubmitedBets
