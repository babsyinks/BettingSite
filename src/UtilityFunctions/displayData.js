import extractData from "./extractData"

export default function(parentDiv,leagueWrapper,arr) {
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
                        //alert('oho something is wrong'
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
    
      let image = document.createElement('img')
      image.src = './Images/cancel_edited.jpg'

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
      imgSp.style.position = 'absolute'
      imgSp.style.right = '15px'
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
      //odd.style.position = 'relative'
      //odd.style.left = '50px'
      //odd.style.right = '25px'
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

      calculateDiv.appendChild(holder)
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

    function handleValClicks(obj) {

      if (obj.style.backgroundColor === 'rgb(84, 3, 160)') {
        obj.style.backgroundColor = 'rgb(3, 38, 143)'
      }
       else {
        obj.id = 'current'
        obj.setAttribute('style', 'background-color:rgb(84, 3, 160)')
        let myMatchArr = ['ArsenalvsChelsea',
          'LiverpoolvsBournemouth',
          'MancityvsWestHam',
          'ManUtdvsNewcastle'
        ]
        let myEle = retClass(myMatchArr, 'current')
        for (const elm of myEle) {
          if (elm.id !== 'current' && elm.style.backgroundColor === 'rgb(84, 3, 160)') {
            elm.style.backgroundColor = 'rgb(3, 38, 143)'
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
      parentDiv.appendChild(leagueWrapper)
    }

    function selectOne(id) {

      let arr_ids = ['main', 'gg_ng', 'ou1p5', 'ou2p5', 'ou3p5', 'ou4p5', 'redCard', 'penalty', 'conerou8p5', 'conerou11p5', 'winEither', 'winBoth', 'ou1p5Home', 'ou1p5Away', 'ou0p5Home', 'ou0p5Away']
      let filtered_arr = arr_ids.filter(currentID => currentID !== id)
      for (let v of filtered_arr) {
        let doc = document.getElementById(v)

        if (doc.style.backgroundColor === 'rgb(84, 3, 160)') {
          doc.setAttribute('style', 'background-color:royalblue')
          break
        }

      }
    }

    function handleMain(i, j) {

      match = arr[i][j].match

      let arrz = []

      let keys = Object.keys(arr[i][j])

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
        arrz.push(arr[i][j][k])
      }

      //arrz.push(one, x, two, onex, onetwo, xtwo)
      display_each(arrz)

    }

    function clickOnOption(id) {
      this.setAttribute('style', 'background-color:rgb(84, 3, 160)')
      selectOne(id)
      if (subDiv.hasChildNodes()) {
        let children = Array.from(subDiv.children)
        for (let c of children) {
          subDiv.removeChild(c)

        }

      }

    }
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j].name === 'main') {
          handleMain(i, j)

        }

      }
    }
    (function eventHandlers() {

      let matches_array = extractData('England')

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

      function assignHandlers(x) {
        for (let i = 0; i < matches_array.length; i++) {
          for (let j = 0; j < matches_array[i].length; j++) {

            if ((matches_array[i][j].name === 'main') && (x === 'main')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'gg_ng') && (x === 'gg_ng')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou1p5') && (x === 'ou1p5')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou2p5') && (x === 'ou2p5')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou3p5') && (x === 'ou3p5')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou4p5') && (x === 'ou4p5')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'redCard') && (x === 'redCard')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'penalty') && (x === 'penalty')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'conerou8p5') && (x === 'conerou8p5')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'conerou11p5') && (x === 'conerou11p5')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'winEither') && (x === 'winEither')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'winBoth') && (x === 'winBoth')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou1p5Home') && (x === 'ou1p5Home')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou1p5Away') && (x === 'ou1p5Away')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou0p5Home') && (x === 'ou0p5Home')) {
              handleMain(i, j)
            } else if ((matches_array[i][j].name === 'ou0p5Away') && (x === 'ou0p5Away')) {
              handleMain(i, j)
            }
            //['gg_ng','ou1p5','ou2p5','ou3p5','ou4p5','redCard','penalty','conerou8p5','conerou11p5',
            //'winEither','winBoth','ou1p5Home','ou1p5Away','ou0p5Home','ou0p5Away']

          }
        }

      }
      function returnDiv() {
        let sD = document.getElementsByClassName('subDivMini')[0]
        let sDM = document.getElementsByClassName('subDiv')[0]
        subDiv = sD ? sD : sDM
      }

      function handle(obj, id) {
        clickOnOption.call(obj, id)
        labelDiv = null
        returnDiv()

        if (id === 'main') {
          subDiv.className = 'subDiv'
        } else {
          subDiv.className = 'subDivMini'
        }

        assignHandlers(id)

      }

      main.addEventListener('click', handle.bind(this, main, 'main'))

      gg_ng.addEventListener('click', handle.bind(this, gg_ng, 'gg_ng'))

      ou1p5.addEventListener('click', handle.bind(this, ou1p5, 'ou1p5'))

      ou2p5.addEventListener('click', handle.bind(this, ou2p5, 'ou2p5'))

      ou3p5.addEventListener('click', handle.bind(this, ou3p5, 'ou3p5'))

      ou4p5.addEventListener('click', handle.bind(this, ou4p5, 'ou4p5'))

      redCard.addEventListener('click', handle.bind(this, redCard, 'redCard'))

      penalty.addEventListener('click', handle.bind(this, penalty, 'penalty'))

      conerou8p5.addEventListener('click', handle.bind(this, conerou8p5, 'conerou8p5'))

      conerou11p5.addEventListener('click', handle.bind(this, conerou11p5, 'conerou11p5'))

      winEither.addEventListener('click', handle.bind(this, winEither, 'winEither'))

      winBoth.addEventListener('click', handle.bind(this, winBoth, 'winBoth'))

      ou1p5Home.addEventListener('click', handle.bind(this, ou1p5Home, 'ou1p5Home'))

      ou1p5Away.addEventListener('click', handle.bind(this, ou1p5Away, 'ou1p5Away'))

      ou0p5Home.addEventListener('click', handle.bind(this, ou0p5Home, 'ou0p5Home'))

      ou0p5Away.addEventListener('click', handle.bind(this, ou0p5Away, 'ou0p5Away'))

    })()
  }