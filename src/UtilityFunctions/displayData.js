import{reCalculateOdds,calculateBonus} from './calculateOdds.js'
import toCurrency from './displayInCurrencyFormat.js'
export default function(parentDiv,leagueWrapper,arr,league,ratingsObj) {
    var match
    //, one, x, two, onex, onetwo, xtwo
    var subDiv = document.createElement('div')
    subDiv.className = 'subDiv'
    let labelDiv = null
  
    function myFilter(array) {

      var one, x, two, onex, onetwo, xtwo, gg, ng, ov, un, yes, no
      var main_arr = []
      var other_arrs = []

      for (let val of array) {
        switch (val) {
        case '1':
          one = val
          other_arrs.push(one)
          break

        case 'X':
          x = val
          break

        case '2':
          two = val
          other_arrs.push(two)
          break

        case '1X':
          onex = val
          break

        case '12':
          onetwo = val
          break

        case 'X2':
          xtwo = val
          break

        case 'gg':
          gg = val
          other_arrs.push(gg)
          break

        case 'ng':
          ng = val
          other_arrs.push(ng)
          break

        case 'ov':
          ov = val
          other_arrs.push(ov)
          break

        case 'un':
          un = val
          other_arrs.push(un)
          break

        case 'yes':
          yes = val
          other_arrs.push(yes)
          break

        case 'no':
          no = val
          other_arrs.push(no)
          break

        default:
                
        }
      }

      if (other_arrs.includes('1') && x) {
        main_arr.push(one, x, two, onex, onetwo, xtwo)
        return main_arr
      }

      return other_arrs
    }
    //display selected odds on the calculate div
    function displayOnCalculateDiv(spELem) {

      let calculateDiv = document.getElementById('calculate')
      let val = spELem.textContent
      //retrieves class of form arsenalvschelsea
      let myClass = spELem.classList.item(1)
      //retrieves class of form main,gg,etc
      const oddCategoryClass = spELem.classList.item(2)
      const arrOfChildren = Array.from(calculateDiv.children) 

      for (const el of arrOfChildren) {
        if(el.className === `${myClass}_${league}`){
          calculateDiv.removeChild(el)
        }
      }

      let image = document.createElement('img')
      //image.src = './Images/cancel_edited.jpg'
      image.src = '../../Images/cancel_edited.jpg'
      image.onclick = ()=>{
        spELem.style.backgroundColor = 'rgb(3, 38, 143)'
        deselectOdd(spELem)
        reCalculateOdds()
      }
      let classGroups = document.getElementsByClassName(myClass)

      let classArr = myClass.split('vs')
      let match = classArr.join(' vs ')

      classGroups = Array.from(classGroups)
      let index
      for (let i = 0; i < classGroups.length; i++) {
        if (classGroups[i] === spELem) {
          index = i
          break
        }
      }
      let match_state = document.getElementsByClassName('options')[index].textContent
      
      let matchDiv = document.createElement('div')
      // e.g arsenal vs chelsea
      matchDiv.textContent = match
      matchDiv.style.fontWeight = 'bold'
      // image
      let imgSp = document.createElement('span')
      imgSp.appendChild(image)
      imgSp.style.textAlign = 'right'
      imgSp.style.paddingRight = '5px'
      // e.g 1, x or 2
      let result = document.createElement('span')
      result.textContent = match_state
      result.style.textAlign = 'left'
      result.style.fontWeight = 'bold'
      result.style.color = 'rgb(3, 38, 143)'
      // e.g 2.38
      let odd = document.createElement('span')
      odd.textContent = val
      odd.className = 'odds'

      let moreInfoDiv = document.createElement('div')
      moreInfoDiv.style.display = 'grid'
      moreInfoDiv.style.gridTemplateColumns = '1fr 6fr 1fr'
      moreInfoDiv.style.gridTemplateRows = 'auto'
      moreInfoDiv.style.gridTemplateAreas = `${result} ${odd} ${imgSp}`
      moreInfoDiv.appendChild(result)
      moreInfoDiv.appendChild(odd)
      moreInfoDiv.appendChild(imgSp)

      let holder = document.createElement('div')
      holder.appendChild(matchDiv)
      holder.appendChild(moreInfoDiv)
      holder.className = `${myClass}_${league}`
      holder.classList.add('selectedMatches')
      holder.classList.add(`ratings_${ratingsObj[myClass]}`)
      holder.classList.add(`cat_${oddCategoryClass}`)
      
      const msgDiv = document.getElementById('msgDiv')
      if(msgDiv){
        calculateDiv.removeChild(msgDiv)
      }
      calculateDiv.prepend(holder)
      const selectedMatchesCount = Array.from(document.getElementsByClassName('selectedMatches')).length

      const oddsLabel = document.createElement('label')
      oddsLabel.textContent = 'Odds:'

      const oddsVal = document.createElement('span')
      const totalOdds = Array.from(document.getElementsByClassName('odds'))
      .map((elem)=>+elem.textContent)
      .reduce((acc,val)=>acc*val,1)

      oddsVal.id = 'oddsVal'
      oddsVal.textContent = toCurrency(totalOdds.toFixed(2)) 
      const  amountLabel = document.createElement('label')
      amountLabel.textContent = 'Amount:'
      const amountInput = document.createElement('input')
      amountInput.type = 'text'
      amountInput.id = 'amountInput'
      //amountInput.value = ''
      const bonusLabel = document.createElement('label')
      bonusLabel.textContent = 'Bonus:'
      const bonusVal = document.createElement('span')
      bonusVal.id = 'bonusVal'

      let inputEle = document.getElementById('amountInput')
      const inputVal = inputEle?inputEle.value:''
      const bonusValue = calculateBonus(totalOdds,selectedMatchesCount,inputVal)
      bonusVal.textContent = toCurrency(bonusValue.toFixed(2)) 

      const potentialWinLabel = document.createElement('label')
      potentialWinLabel.textContent = 'Pot Win:'
      const potentialWinVal = document.createElement('span')
      potentialWinVal.textContent = toCurrency(((totalOdds*inputVal) + bonusValue).toFixed(2)) 
      potentialWinVal.id = 'potentialWinVal'

      const betButton = document.createElement('input')
      betButton.id = 'betButton'
      betButton.type = 'button'
      betButton.value = 'Bet'
      betButton.onclick = async ()=>{
        
        const selectedMatches = Array.from(document.getElementsByClassName('selectedMatches')) 
        const arrayOfMatchesAndResults = selectedMatches.map((elem)=>{
          const match = elem.firstChild.textContent
          const resultWrapper = Array.from(elem.children)[1] 
          const result = resultWrapper.firstChild.textContent
          const league = elem.classList.item(0).split('_')[1]
          const rating = elem.classList.item(2).split('_')[1]
          const category = elem.classList.item(3).split('_')[1]
          return {match,result,league,rating,category} 
        })

        const response = await fetch('/display/bets',{
          method:'post',
          headers:{'Accept':'application/json',
                  'Content-Type':'application/json',
                  'X-Auth-Token':localStorage.getItem('token')},
          body:JSON.stringify(arrayOfMatchesAndResults)
        })


      }
      betButton.disabled = true
      //****** */
      //this is the header that display information at the top of all odds
      let calculateHeader = document.getElementById('calculateHeader')
      if(calculateHeader){
        calculateDiv.removeChild(calculateHeader)
      }
      calculateHeader = document.createElement('div')
      calculateHeader.id = 'calculateHeader'
      const betSlip = document.createElement('span')
      betSlip.textContent = 'Betslip'
      const selectedMatchesDetails = document.createElement('span')
      selectedMatchesDetails.textContent = `Selections:${selectedMatchesCount}`
      calculateHeader.appendChild(betSlip)
      calculateHeader.appendChild(selectedMatchesDetails)
      calculateDiv.prepend(calculateHeader)
      //this displays different infos about the odds selected like odds,amount,bonus,etc 
      let calculationInfo = document.getElementById('calculationInfo')
      const oddsValEle = document.getElementById('oddsVal')
      const bonusValEle = document.getElementById('bonusVal')
      const potentialWinValEle = document.getElementById('potentialWinVal')
      const returnWrapperDiv = (color,fontSize)=>{
        const div = document.createElement('div')
        div.className = 'tabulate'
        if(fontSize){
          div.style = `color:${color};${fontSize}`
          return div
        }
        div.style = `color:${color}`
        return div
      }

      const wrapInSpanWithLabel = (ele)=>{
        const label = document.createElement('label')
        label.textContent = '$'
        label.style = `font-weight:bold;margin-right:2px`
        const span = document.createElement('span')
        span.appendChild(label)
        span.appendChild(ele)
        return span
      } 

      if(!calculationInfo){
        calculationInfo = document.createElement('div')
        calculationInfo.id = 'calculationInfo' 
        const oddsDetails = returnWrapperDiv('rgb(141, 0, 0)')
        oddsDetails.appendChild(oddsLabel)
        oddsDetails.appendChild(oddsVal)
        //calculationInfo.appendChild(oddsLabel)
        calculationInfo.appendChild(oddsDetails)
        const amountDetails = returnWrapperDiv('black')
        amountDetails.appendChild(amountLabel)
        amountDetails.appendChild(wrapInSpanWithLabel(amountInput))
        //calculationInfo.appendChild(amountLabel)
        calculationInfo.appendChild(amountDetails)
        const bonusDetails = returnWrapperDiv('black')
        bonusDetails.appendChild(bonusLabel)
        bonusDetails.appendChild(wrapInSpanWithLabel(bonusVal))
        //calculationInfo.appendChild(bonusLabel)
        calculationInfo.appendChild(bonusDetails)
        const potentialWinDetails = returnWrapperDiv('rgb(0, 88, 0)','font-size:18px')
        //potentialWinDetails.style = 'font-size:18px'
        potentialWinDetails.appendChild(potentialWinLabel)
        potentialWinDetails.appendChild(wrapInSpanWithLabel(potentialWinVal))
        //calculationInfo.appendChild(potentialWinLabel)
        calculationInfo.appendChild(potentialWinDetails)
        calculationInfo.appendChild(betButton)
        const errorMessageDiv = document.createElement('div')
        errorMessageDiv.id = 'error'
        calculationInfo.appendChild(errorMessageDiv)
        calculateDiv.appendChild(calculationInfo)
      }
      else{
        oddsValEle.textContent = oddsVal.textContent
        bonusValEle.textContent = bonusVal.textContent
        potentialWinValEle.textContent = potentialWinVal.textContent
      }
      
      amountInput.onkeyup = (e)=>{
        const rawInput = +e.target.value
        const errorDiv = document.getElementById('error')
        let inputValue
        if (Number.isNaN(rawInput) || rawInput === 0 || Math.sign(rawInput) !== 1 || rawInput < 1||rawInput>1000000) {
          inputValue = ''
          document.getElementById('amountInput').value = ''
          
          errorDiv.textContent = 'Wrong input or bet amount exceeds $1,000,000'
          errorDiv.style = 'display:block'
        }
        else{
          inputValue = e.target.value
          errorDiv.textContent = ''
          errorDiv.style = 'display:none'
        }
        const totalOdds = Array.from(document.getElementsByClassName('odds'))
        .map((elem)=>+elem.textContent)
        .reduce((acc,val)=>acc*val,1) 
        
        const selectedMatchesCount = Array.from(document.getElementsByClassName('selectedMatches')).length
        const bonusValue = calculateBonus(totalOdds,selectedMatchesCount,inputValue)
        document.getElementById('bonusVal').textContent = toCurrency(bonusValue.toFixed(2)) 
        document.getElementById('potentialWinVal').textContent = toCurrency(((totalOdds*inputValue) + bonusValue).toFixed(2)) 
        const betButton = document.getElementById('betButton')
        if(inputValue.length!==0){
          betButton.disabled = false
        }
        else{
          betButton.disabled = true
        }
      }
    }

    function retClass(arr, id) {
      let doc = document.getElementById(id)
      
      let ele, elem
      for (const val of arr) {
        ele = document.getElementsByClassName(val)
        elem = Array.from(ele)
        if (elem.includes(doc)) {
          return elem
        }
      }
    }

    function deselectOdd(spElem){
      //pick second class. it is of form 'arsenalvschelsea'
      const matchClass = spElem.classList.item(1)
      const holder = document.getElementsByClassName(`${matchClass}_${league}`)
      const calculateDiv = document.getElementById('calculate')
      const holderArray = Array.from(holder)
      for (const el of holderArray) {
        calculateDiv.removeChild(el)
      }
      if(calculateDiv.childElementCount === 2){
        const msgDiv = document.createElement('div')
        msgDiv.textContent = `Pick odds from the various matches on the left.There are multiple events to choose odds
        from.The most recently selected odd for a match will override the previously selected odd.The minimum and maximum acceptable 
        bet amounts are $1 and $1,000,000 respectively.The maximum possible win is $1,000,000,000.`
        
        msgDiv.id = 'msgDiv'
        calculateDiv.appendChild(msgDiv)
      }
      const errorDiv = document.getElementById('error')
      errorDiv.textContent = ''
      errorDiv.style = 'display:none'

    }

    function handleValClicks(obj) {

      if(obj.textContent === ''|| Array.from(document.getElementsByClassName('selectedMatches')).length === 30){
        return
      }
      //this handles an odd holding span element that has been selected already,so it deselects it 
      if (obj.style.backgroundColor === 'rgb(84, 3, 160)') {
        obj.style.backgroundColor = 'rgb(3, 38, 143)'
        deselectOdd(obj)
        reCalculateOdds()
      }
      //this does the opposite of the above
       else {
        let potWin = document.getElementById('potentialWinVal')
        const errorDiv = document.getElementById('error')

        if(potWin && errorDiv){
            const potWinNum = +potWin.textContent.split(',').reduce((acc,val)=>acc+val,'')
            
            if(potWinNum>1000000000){
              errorDiv.style= 'display:block'
              errorDiv.textContent = 'Maximum winnable amount is $1000,000,000'
              return
            }
            else{
              errorDiv.style ='display:none'
              errorDiv.textContent = ''
            }
        }
        
        obj.id = 'current'
        obj.setAttribute('style', 'background-color:rgb(84, 3, 160)')
        let myMatchArr = arr.map((matchObj)=>{
          let trimmedStr = matchObj.match.replace(/\s+/g,'')
          return trimmedStr
        })
        let myEle = retClass(myMatchArr, 'current')
        for (const elm of myEle) {
          if (elm.id !== 'current' && elm.style.backgroundColor === 'rgb(84, 3, 160)') {
            elm.style.backgroundColor = 'rgb(3, 38, 143)'
            deselectOdd(elm)
            reCalculateOdds()
          }

        }
        displayOnCalculateDiv(obj)
        obj.removeAttribute('id')
      }

    }

    function add(v, mch) {
      let sp = document.createElement('span')
      mch = mch.replace(/\s+/g, '')
      sp.className = 'vals'
      sp.classList.add(mch)
      sp.classList.add('main')
      sp.textContent = v
      sp.addEventListener('click', handleValClicks.bind(this, sp))
      subDiv.appendChild(sp)

    }

    function display_each(arrz) {
      let matchSpan = document.createElement('span')
      matchSpan.className = 'matchSpan'
      matchSpan.textContent = match
      subDiv.appendChild(matchSpan)
      arrz.forEach(v => {
        add(v, match)
      })
      leagueWrapper.appendChild(subDiv)
      parentDiv.prepend(leagueWrapper)
    }

    function handleMain(i) {

      match = arr[i].match
      let arrz = []

      let keys = Object.keys(arr[i])

      keys = myFilter(keys)

      //append label for the game just once
      if (!labelDiv) {

        labelDiv = document.createElement('div')

        let mtch = document.createElement('span')

        mtch.className = 'match'
        mtch.textContent = 'Match'

        subDiv.appendChild(mtch)

        for (let v of keys) {
          let options = document.createElement('span')
          options.className = 'options'
          options.textContent = v.toUpperCase()
          subDiv.appendChild(options)
        }
      }

      for (let k of keys) {
        arrz.push(arr[i][k])
      }
      //arrz.push(one, x, two, onex, onetwo, xtwo)
      display_each(arrz)

    }

    for (let i = 0; i < arr.length; i++) {
        if (arr[i].name === 'main') {
          handleMain(i)
      }
    }

    function optionsListener(optionObj,id){

      const subDivForLeague = Array.from(leagueWrapper.children)[2] 
      leagueWrapper.removeChild(subDivForLeague)
      
      let subDivToAppend = document.createElement('div')

      if(id === 'main'){
        subDivToAppend.className = 'subDiv' 
      }
      else{
        subDivToAppend.className = 'subDivMini'
      }
      const arrOfChosenOption = arr.filter((obj)=>obj.name === id)
      optionObj.setAttribute('style', 'background-color:rgb(84, 3, 160)')
      const disp = document.getElementById(`${league}Display`)

      for (const ch of Array.from(disp.children)) {
        if(ch.id!==id){
          ch.setAttribute('style', 'background-color:royalblue')
        }
      }

      const mtch = document.createElement('span')

      mtch.className = 'match'
      mtch.textContent = 'Match'

      subDivToAppend.appendChild(mtch)

      const keys = myFilter(Object.keys(arrOfChosenOption[0])) 
        
      for (let v of keys) {
        let options = document.createElement('span')
        options.className = 'options'
        options.textContent = v.toUpperCase()
        subDivToAppend.appendChild(options)

      }
      
      arrOfChosenOption.forEach((obj)=>{
        const matchSpan = document.createElement('span')
        matchSpan.className = 'matchSpan'
        matchSpan.textContent = obj.match
        subDivToAppend.appendChild(matchSpan)

        keys.forEach((k)=>{
          const sp = document.createElement('span')
          const mch = obj.match.replace(/\s+/g, '')
          sp.className = 'vals'
          sp.classList.add(mch)
          sp.classList.add(id)
          sp.textContent = obj[k]
          sp.addEventListener('click', handleValClicks.bind(this, sp))
          subDivToAppend.appendChild(sp)         
        })

      })

      leagueWrapper.appendChild(subDivToAppend)

    }

    (function eventHandlers() {

      let main = document.getElementById('main')
      let gg_ng = document.getElementById('gg_ng')
      let ou1p5 = document.getElementById('ou1p5')
      let ou2p5 = document.getElementById('ou2p5')
      let ou3p5 = document.getElementById('ou3p5')
      let ou4p5 = document.getElementById('ou4p5')
      let redCard = document.getElementById('redCard')
      let penalty = document.getElementById('penalty')
      let conerou8p5 = document.getElementById('conerou8p5')
      let conerou11p5 = document.getElementById('conerou11p5')
      let winEither = document.getElementById('winEither')
      let winBoth = document.getElementById('winBoth')
      let ou1p5Home = document.getElementById('ou1p5Home')
      let ou1p5Away = document.getElementById('ou1p5Away')
      let ou0p5Home = document.getElementById('ou0p5Home')
      let ou0p5Away = document.getElementById('ou0p5Away')

      main.addEventListener('click', optionsListener.bind(this, main, 'main'))

      gg_ng.addEventListener('click', optionsListener.bind(this, gg_ng, 'gg_ng'))

      ou1p5.addEventListener('click', optionsListener.bind(this, ou1p5, 'ou1p5'))

      ou2p5.addEventListener('click', optionsListener.bind(this, ou2p5, 'ou2p5'))

      ou3p5.addEventListener('click', optionsListener.bind(this, ou3p5, 'ou3p5'))

      ou4p5.addEventListener('click', optionsListener.bind(this, ou4p5, 'ou4p5'))

      redCard.addEventListener('click', optionsListener.bind(this, redCard, 'redCard'))

      penalty.addEventListener('click', optionsListener.bind(this, penalty, 'penalty'))

      conerou8p5.addEventListener('click', optionsListener.bind(this, conerou8p5, 'conerou8p5'))

      conerou11p5.addEventListener('click', optionsListener.bind(this, conerou11p5, 'conerou11p5'))

      winEither.addEventListener('click', optionsListener.bind(this, winEither, 'winEither'))

      winBoth.addEventListener('click', optionsListener.bind(this, winBoth, 'winBoth'))

      ou1p5Home.addEventListener('click', optionsListener.bind(this, ou1p5Home, 'ou1p5Home'))

      ou1p5Away.addEventListener('click', optionsListener.bind(this, ou1p5Away, 'ou1p5Away'))

      ou0p5Home.addEventListener('click', optionsListener.bind(this, ou0p5Home, 'ou0p5Home'))

      ou0p5Away.addEventListener('click', optionsListener.bind(this, ou0p5Away, 'ou0p5Away'))

    })()
  }