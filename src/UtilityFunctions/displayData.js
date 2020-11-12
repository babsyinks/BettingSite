export default function(parentDiv,leagueWrapper,arr,league) {
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
      //grab the second class assigned to the element
      let myClass = spELem.classList.item(1)
    
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
      // e.g arsenal vs chelsea
      let matchDiv = document.createElement('div')
      matchDiv.textContent = match
      matchDiv.style.fontWeight = 'bold'
      // image
      let imgSp = document.createElement('span')
      imgSp.appendChild(image)
      //imgSp.style.position = 'absolute'
      //imgSp.style.right = '15px'
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
      odd.style.fontWeight = 'bold'
      odd.style.color = 'rgb(84, 3, 160)'
      odd.style.textAlign = 'right'

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
      holder.style.border = '1px solid grey'
      holder.className = `${myClass}_${league}`

      calculateDiv.prepend(holder)
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
    }

    function handleValClicks(obj) {
      //this handles a odd holding span element that has been selected already,so it deselects it 
      if(obj.textContent === ''){
        return
      }
      if (obj.style.backgroundColor === 'rgb(84, 3, 160)') {
        obj.style.backgroundColor = 'rgb(3, 38, 143)'
        deselectOdd(obj)
      }
      //this does the opposite of the above
       else {
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