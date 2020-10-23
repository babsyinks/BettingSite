const{
    ggParamsObj,
    ou1p5ParamsObj,
    ou2p5ParamsObj,
    ou3p5ParamsObj,
    ou4p5ParamsObj,
    ou0p5HomeParamsObj,
    ou1p5HomeParamsObj,
    ou0p5AwayParamsObj,
    ou1p5AwayParamsObj,
    conerou8p5ParamsObj,
    conerou11p5ParamsObj
} = require('../data/oddsData')
//  main,gg,ou1p5,ou2p5,ou3p5,ou4p5,redCard,penalty,conerou8p5,conerou11p5,winEither,winBoth,ou1p5Home,ou1p5Away,ou0p5Home,ou0p5Away          
const winDecider = (ratingsDifference,homerating,awayrating)=>{

    const getRandomDecimal = ()=>{
        return (Math.floor(Math.random()*100))/100
    }
    //this helps to adjust the decimal pat of odds of home and awayteams 
    const getDecimalVal = (decimalNum,greater)=>{
        let dec = decimalNum
        //home team
        if(greater){
            if(decimalNum>0.50){
              dec = decimalNum-=0.50
            }
        }
        //away team
        else {
            if(decimalNum<0.50){
                dec = decimalNum+=0.50
            }
        }
        return dec
    }

    const randomBool = ()=>{
      const rand = Math.floor(Math.random()*100)
      return rand>50
    }

    const getDecimalForGoals = (arr)=>{
        const getRandIndex = (array)=>Math.floor(Math.random()*array.length)
        const firstVal = arr[getRandIndex(arr)]
        const arr2 = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
        const secondVal = arr2[getRandIndex(arr2)]
        const total = (firstVal+secondVal)/10
        return total

    }
    
    const getMainOdds = (homeWholeNum,awayWholeNum,drawWholeNum,doubleChanceWholeNum)=>{

        let decimal
        let wholeNumber
        const oddsObj = {}
        wholeNumber = homeWholeNum
        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,true)
        oddsObj.one = wholeNumber + decimal

        wholeNumber = awayWholeNum
        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,false)
        oddsObj.two = wholeNumber + decimal

        wholeNumber = drawWholeNum
        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,randomBool())
        oddsObj.x = wholeNumber + decimal

        wholeNumber = doubleChanceWholeNum 
        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,true)
        oddsObj.onex = wholeNumber + decimal

        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,false)
        oddsObj.xtwo = wholeNumber + decimal

        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,randomBool())
        oddsObj.onetwo = wholeNumber + decimal

        return oddsObj
    }

    const setOverUnderOdds = (highGoalsWholeNum,highGoalsArr,lowGoalsWholeNum,lowGoalsArr,oddsObject,isGGNG)=>{
        let decimal = getDecimalForGoals(highGoalsArr)
        let highGoalsOdds = highGoalsWholeNum + decimal

        decimal = getDecimalForGoals(lowGoalsArr)
        let lowGoalsOdds = lowGoalsWholeNum + decimal
        if(isGGNG){
        oddsObject.gg = highGoalsOdds
        oddsObject.ng = lowGoalsOdds
        }
        else{
        oddsObject.ov = highGoalsOdds
        oddsObject.un = lowGoalsOdds
        }

    }

    const getOverUnderOdds = (hmRating,awRating,oddsObj,paramsObj,isGGNG)=>{
        
        if(hmRating>0 && awRating>0){
            setOverUnderOdds(paramsObj.zero.hg,paramsObj.zero.hga,paramsObj.zero.lg,paramsObj.zero.lga,oddsObj,isGGNG)
        }
        else if(hmRating>1 && awRating>1){
            setOverUnderOdds(paramsObj.one.hg,paramsObj.one.hga,paramsObj.one.lg,paramsObj.one.lga,oddsObj,isGGNG)
        }
        else if(hmRating>2 && awRating>2){
            setOverUnderOdds(paramsObj.two.hg,paramsObj.two.hga,paramsObj.two.lg,paramsObj.two.lga,oddsObj,isGGNG)
        }
        else if(hmRating>3 && awRating>3){
            setOverUnderOdds(paramsObj.three.hg,paramsObj.three.hga,paramsObj.three.lg,paramsObj.three.lga,oddsObj,isGGNG)
        }
        else if(hmRating>4 && awRating>4){
            setOverUnderOdds(paramsObj.four.hg,paramsObj.four.hga,paramsObj.four.lg,paramsObj.four.lga,oddsObj,isGGNG)
        }
        else if(hmRating>5 && awRating > 5){

            setOverUnderOdds(paramsObj.five.hg,paramsObj.five.hga,paramsObj.five.lg,paramsObj.five.lga,oddsObj,isGGNG)
        }
        else if(hmRating>6 && awRating > 6){

            setOverUnderOdds(paramsObj.six.hg,paramsObj.six.hga,paramsObj.six.lg,paramsObj.six.lga,oddsObj,isGGNG) 
        }
        else if(hmRating>7 && awRating > 7){

            setOverUnderOdds(paramsObj.seven.hg,paramsObj.seven.hga,paramsObj.seven.lg,paramsObj.seven.lga,oddsObj,isGGNG)
        }
        else if(hmRating>8 && awRating > 8){

            setOverUnderOdds(paramsObj.eight.hg,paramsObj.eight.hga,paramsObj.eight.lg,paramsObj.eight.lga,oddsObj,isGGNG)
        }
        else if(hmRating>9 && awRating > 9){

            setOverUnderOdds(paramsObj.nine.hg,paramsObj.nine.hga,paramsObj.nine.lg,paramsObj.nine.lga,oddsObj,isGGNG)

        }

        return oddsObj
    }

    const getOverOrUnderForHomeOrAway = (hmRating,awRating,oddsObj,paramsObj)=>{
        const rating = hmRating||awRating
        if(rating>0){
            setOverUnderOdds(paramsObj.zero.hg,paramsObj.zero.hga,paramsObj.zero.lg,paramsObj.zero.lga,oddsObj)
        }
        else if(rating>1){
            setOverUnderOdds(paramsObj.one.hg,paramsObj.one.hga,paramsObj.one.lg,paramsObj.one.lga,oddsObj)
        }
        else if(rating>2){
            setOverUnderOdds(paramsObj.two.hg,paramsObj.two.hga,paramsObj.two.lg,paramsObj.two.lga,oddsObj)
        }
        else if(rating>3){
            setOverUnderOdds(paramsObj.three.hg,paramsObj.three.hga,paramsObj.three.lg,paramsObj.three.lga,oddsObj)
        }
        else if(rating>4){
            setOverUnderOdds(paramsObj.four.hg,paramsObj.four.hga,paramsObj.four.lg,paramsObj.four.lga,oddsObj)
        }
        else if(rating>5){

            setOverUnderOdds(paramsObj.five.hg,paramsObj.five.hga,paramsObj.five.lg,paramsObj.five.lga,oddsObj)
        }
        else if(rating>6){

            setOverUnderOdds(paramsObj.six.hg,paramsObj.six.hga,paramsObj.six.lg,paramsObj.six.lga,oddsObj) 
        }
        else if(rating>7){

            setOverUnderOdds(paramsObj.seven.hg,paramsObj.seven.hga,paramsObj.seven.lg,paramsObj.seven.lga,oddsObj)
        }
        else if(rating>8){

            setOverUnderOdds(paramsObj.eight.hg,paramsObj.eight.hga,paramsObj.eight.lg,paramsObj.eight.lga,oddsObj)
        }
        else if(rating>9){

            setOverUnderOdds(paramsObj.nine.hg,paramsObj.nine.hga,paramsObj.nine.lg,paramsObj.nine.lga,oddsObj)
        }

        return oddsObj
    }

    const getWinEitherOrWinBoth = (homeWholeNum,awayWholeNum)=>{

        let decimal
        let wholeNumber
        const oddsObj = {}
        wholeNumber = homeWholeNum
        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,true)
        oddsObj.one = wholeNumber + decimal

        wholeNumber = awayWholeNum
        decimal = getRandomDecimal()
        decimal = getDecimalVal(decimal,false)
        oddsObj.two = wholeNumber + decimal

        return oddsObj
    }

    const getPenaltyOdds = ()=>({
        yes:3.87,
        no:1.21
    })

    const getRedCardOdds = ()=>({
        yes:4.12,
        no:1.19
    })

    

    let mainObj,ggObj,ou1p5,ou2p5,ou3p5,ou4p5,ou0p5home,ou0p5Away,ou1p5Home,ou1p5Away,conerou8p5,conerou11p5,winEither,winBoth,redCard,penalty
    //keys zero,one,two,etc maps to how getOverUnderOdds function determines what conditional to run
    //hg-highgoals, hga-highgoalsarray, lg-lowgoals, lga-lowgoalsarray

    switch(ratingsDifference){
        case 0:
            mainObj = getMainOdds(2,2,3,1)
            ggObj = getOverUnderOdds(homerating,awayrating,{},ggParamsObj,true)
            ou1p5 = getOverUnderOdds(homerating,awayrating,{},ou1p5ParamsObj)
            ou2p5 = getOverUnderOdds(homerating,awayrating,{},ou2p5ParamsObj)
            ou3p5 = getOverUnderOdds(homerating,awayrating,{},ou3p5ParamsObj)
            ou4p5 = getOverUnderOdds(homerating,awayrating,{},ou4p5ParamsObj)
            ou0p5home = getOverOrUnderForHomeOrAway(homerating,null,{},ou0p5HomeParamsObj)
            ou0p5Away = getOverOrUnderForHomeOrAway(null,awayrating,{},ou0p5AwayParamsObj)
            ou1p5Home = getOverOrUnderForHomeOrAway(homerating,null,{},ou1p5HomeParamsObj)
            ou1p5Away = getOverOrUnderForHomeOrAway(null,awayrating,{},ou1p5AwayParamsObj)
            conerou8p5 = getOverUnderOdds(homerating,awayrating,{},conerou8p5ParamsObj)
            conerou11p5 = getOverUnderOdds(homerating,awayrating,{},conerou11p5ParamsObj)
            winEither = getWinEitherOrWinBoth(1,1)
            winBoth = getWinEitherOrWinBoth(2,2)
            penalty = getPenaltyOdds()
            redCard = getRedCardOdds()
            break
    }
}