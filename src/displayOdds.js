function main() {
//set click event for each country div
  function setClick(divId) {
    const div = document.getElementById(divId)
    let isClicked = false
    const arr_ids = ['main', 'gg_ng', 'ou1p5', 'ou2p5', 'ou3p5', 'ou4p5', 'redCard', 'penalty', 'conerou8p5', 'conerou11p5', 'winEither', 'winBoth', 'ou1p5Home', 'ou1p5Away', 'ou0p5Home', 'ou0p5Away']
    const arr_vals = ['MAIN', 'GG/NG', 'O/U 1.5', 'O/U 2.5', 'O/U 3.5', 'O/U 4.5', 'RED CARD', 'PENALTY', 'CORNER O/U 8.5', 'CORNER O/U 11.5', 'WIN EITHER', 'WIN BOTH', 'O/U 1.5 HOME', 'O/U 1.5 AWAY', 'O/U 0.5 HOME', 'O/U 0.5 AWAY']
    
    div.addEventListener('click', function() {
      const children = div.children
      const arrVal = Array.from(children)
      //remove the children on the div
      for (let ch of children) {
        div.removeChild(ch)
      }
      if (!isClicked) {
        //add the various leagues under the right country
        for (let i = 0; i < arrVal.length; i++) {

          arrVal[i].setAttribute('style', 'display:block')

          arrVal[i].setAttribute('style', 'border:1px solid grey')

          arrVal[i].className = divId + '_League'
          let altColor = false

          arrVal[i].addEventListener('click', function() {

            if (!altColor) {
              this.setAttribute('style', 'color:rgb(255, 255, 255); background-color:rgb(84, 3, 160);font-weight:bold')
              altColor = true

              if (arrVal[i].id === 'epl') {
                const disp = document.getElementById('display')

                if (disp.hasChildNodes()) {
                  let children = Array.from(disp.children)
                  for (let ch of children) {
                    disp.removeChild(ch)
                  }
                }
                let eplDs = document.createElement('div')
                eplDs.id = 'eplDisplay'
                for (let i = 0; i < arr_ids.length; i++) {

                  let myDiv = document.createElement('div')
                  myDiv.setAttribute('id', arr_ids[i])
                  myDiv.setAttribute('class', 'style_divs')
                  myDiv.textContent = arr_vals[i]
                  if (myDiv.id === 'main') {
                    myDiv.setAttribute('style', 'background-color:rgb(84, 3, 160)')
                  }
                  eplDs.appendChild(myDiv)
                }
                let extracted_array = extractData(divId)
                disp.appendChild(eplDs)
                //display data on page
                displayData(disp, extracted_array)
              }
            } else {
              this.setAttribute('style', 'color:black; background-color:white; font-weight:normal; border:1px solid grey')
              altColor = false

              if (arrVal[i].id === 'epl') {
                let disp = document.getElementById('display')


                if (disp.hasChildNodes()) {
                  let c_arr = Array.from(disp.children)
                  for (const v of c_arr) {
                    disp.removeChild(v)
                  }

                }


              }

            }

          })
          div.after(arrVal[arrVal.length - i - 1])
        }
        isClicked = true

        let displ = document.getElementById('display')

        if (displ.hasChildNodes()) {
          let myArr = Array.from(displ.children)
          let choo = document.getElementById('chooser')
          let chs = Array.from(choo.children)
          for (let ch of myArr) {
            if (ch.id === 'eplDisplay') {
              for (let b of chs) {
                if (b.id === 'epl') {
                  b.setAttribute('style', 'color:rgb(255, 255, 255); background-color:rgb(84, 3, 160);font-weight:bold')
                  altColor = true
                }
              }

            }
          }
        }
      } else {

        let chooser = document.getElementById('chooser')

        let nodeVals = document.getElementsByClassName(divId + '_League')
        let arr = Array.from(nodeVals)
        for (let n of arr) {
          chooser.removeChild(n)
          n.setAttribute('style', 'display:none')
          div.appendChild(n)
        }

        isClicked = false
      }
    })

  }

  function displayData(parentDiv, arr) {
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
                        //alert('oho something is wrong')

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
      } else {

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



      parentDiv.appendChild(subDiv)


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


  function extractData(divId) {

    switch (divId) {
    case 'England':
      var epl_values = []
      var champ_values = []
      var lg1_values = []
      var lg2_values = []

      var epl_obj = {}
      var champ_obj = {}
      var lg1_obj = {}
      var lg2_obj = {}

      epl_obj.val = epl_values
      epl_obj.match1 = 'Arsenal vs Chelsea'
      epl_obj.match2 = 'Liverpool vs Bournemouth'
      epl_obj.match3 = 'Mancity vs WestHam'
      epl_obj.match4 = 'Man Utd vs Newcastle'

      champ_obj.val = champ_values
      champ_obj.match1 = 'Leeds Utd vs Norwich'
      champ_obj.match2 = 'Sheffield Utd vs Millwall'
      champ_obj.match3 = 'Middlesbrough vs Reading'
      champ_obj.match4 = 'Westbrom vs Ipswich Town'

      lg1_obj.val = lg1_values
      lg1_obj.match1 = 'Luton Town vs Barnsley'
      lg1_obj.match2 = 'Sunderland vs Rochdale'
      lg1_obj.match3 = 'Portsmouth vs AFC Wimbledon'
      lg1_obj.match4 = 'Charlton Athletic vs Walsall'

      lg2_obj.val = lg2_values
      lg2_obj.match1 = 'Lincoln City vs Mansfield Town'
      lg2_obj.match2 = 'Bury vs Macclefield Town'
      lg2_obj.match3 = 'Milton Keynes Dons vs Port Vale'
      lg2_obj.match4 = 'Exeter City vs Notts County'

      var objArr = []
      objArr.push(epl_obj, champ_obj, lg1_obj, lg2_obj)


      var returnedArray
      for (let ind = 0; ind < objArr.length; ind++) {
        if (ind === 0) {
          returnedArray = execute(objArr[ind].val, objArr[ind].match1, objArr[ind].match2, objArr[ind].match3, objArr[ind].match4)
        }

      }

      break





    }

    function action(tempArr, keysArr, livArr, mancArr, manuArr, clone, i) {


      for (let index = 0; index < tempArr.length; index++) {
        clone[keysArr[index]] = tempArr[index]

      }
      if (i === 0) {
        livArr.push(clone)
      } else if (i === 1) {
        mancArr.push(clone)
      } else if (i === 2) {
        manuArr.push(clone)
      }

    }


    function execute(epl_vals, match1, match2, match3, match4) {

      var vals = []


      var main = {
        name: 'main',
        match: match1,
        '1': '2.30',
        'X': '3.40',
        '2': '2.90',
        '1X': '1.40',
        '12': '1.33',
        'X2': '1.56'
      }



      var gg_ng = {
        name: 'gg_ng',
        match: match1,
        gg: '1.65',
        ng: '2.46'
      }

      var ou1p5 = {
        name: 'ou1p5',
        match: match1,
        ov: '1.27',
        un: '2.89'
      }

      var ou2p5 = {
        name: 'ou2p5',
        match: match1,
        ov: '1.68',
        un: '1.92'
      }

      var ou3p5 = {
        name: 'ou3p5',
        match: match1,
        ov: '2.58',
        un: '1.31'
      }

      var ou4p5 = {
        name: 'ou4p5',
        match: match1,
        ov: '3.97',
        un: '1.08'
      }

      var redCard = {
        name: 'redCard',
        match: match1,
        yes: '4.89',
        no: '1.19'
      }

      var penalty = {
        name: 'penalty',
        match: match1,
        yes: '3.78',
        no: '1.34'
      }

      var conerou8p5 = {
        name: 'conerou8p5',
        match: match1,
        ov: '2.30',
        un: '1.77'
      }

      var conerou11p5 = {
        name: 'conerou11p5',
        match: match1,
        ov: '3.12',
        un: '1.21'
      }

      var winEither = {
        name: 'winEither',
        match: match1,
        '1': '1.50',
        '2': '1.73'
      }

      var winBoth = {
        name: 'winBoth',
        match: match1,
        '1': '1.87',
        '2': '1.91'
      }

      var ou1p5Home = {
        name: 'ou1p5Home',
        match: match1,
        ov: '1.66',
        un: '1.77'
      }

      var ou1p5Away = {
        name: 'ou1p5Away',
        match: match1,
        ov: '1.72',
        un: '1.86'
      }

      var ou0p5Home = {
        name: 'ou0p5Home',
        match: match1,
        ov: '1.14',
        un: '2.96'
      }

      var ou0p5Away = {
        name: 'ou0p5Away',
        match: match1,
        ov: '1.19',
        un: '2.12'
      }

      vals.push(main, gg_ng, ou1p5, ou2p5, ou3p5, ou4p5, redCard, penalty, conerou8p5, conerou11p5, winEither, winBoth, ou1p5Home, ou1p5Away, ou0p5Home, ou0p5Away)


      epl_vals.push(vals)
      var liv_vals = []
      var manc_vals = []
      var manu_vals = []

      //all match values
      var odds = [
        [
          ['1.30', '4.00', '6.70', '1.02', '1.11', '2.99'],
          ['1.88', '1.56'],
          ['1.26', '2.45'],
          ['1.50', '2.13'],
          ['1.90', '1.88'],
          ['2.45', '1.38'],
          ['4.20', '1.19'],
          ['3.89', '1.22'],
          ['1.55', '1.63'],
          ['1.70', '1.40'],
          ['1.20', '7.98'],
          ['1.88', '12.63'],
          ['1.22', '3.40'],
          ['1.97', '1.28'],
          ['1.09', '4.44'],
          ['1.19', '1.62']
        ],
        [
          ['1.55', '3.07', '3.70', '1.12', '1.21', '1.93'],
          ['1.67', '1.46'],
          ['1.33', '2.15'],
          ['1.64', '1.92'],
          ['1.94', '1.78'],
          ['2.49', '1.31'],
          ['4.20', '1.19'],
          ['3.89', '1.22'],
          ['1.47', '1.43'],
          ['1.65', '1.47'],
          ['1.23', '3.24'],
          ['1.90', '5.63'],
          ['1.41', '2.30'],
          ['1.88', '1.22'],
          ['1.16', '3.15'],
          ['1.33', '1.69']
        ],
        [
          ['1.40', '3.44', '4.11', '1.06', '1.24', '2.00'],
          ['1.71', '1.93'],
          ['1.30', '2.48'],
          ['1.60', '2.11'],
          ['1.77', '1.81'],
          ['2.43', '1.39'],
          ['4.20', '1.19'],
          ['3.83', '1.27'],
          ['1.56', '1.66'],
          ['1.73', '1.41'],
          ['1.26', '5.98'],
          ['1.99', '11.63'],
          ['1.24', '3.30'],
          ['1.91', '1.25'],
          ['1.13', '4.01'],
          ['1.17', '1.69']
        ]
      ]


      for (let i = 0; i < odds.length; i++) {
        let arr = []
        let match = ''

        switch (i) {
        case 0:
          //liverpool match values
          arr = odds[i]
          match = match2
          break
        case 1:
          //man city match values
          arr = odds[i]
          match = match3
          break
        case 2:
          //man utd match values
          arr = odds[i]
          match = match4
          break

        }
        for (let j = 0; j < vals.length; j++) {
          let clone = Object.assign({}, vals[j])
          clone.match = match
          let tempArr = []
          switch (j) {
          case 0:
            //main values of each match
            tempArr = arr[j]
            var keys = ['1', 'X', '2', '1X', '12', 'X2']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 1:
            //gg values of each match
            tempArr = arr[j]
            keys = ['gg', 'ng']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 2:
            //ou1p5 values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 3:
            //ou2p5 values for each match  
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 4:
            //ou3p5 values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 5:
            //ou4p5 values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 6:
            //redcard values for each match
            tempArr = arr[j]
            keys = ['yes', 'no']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 7:
            //penalty values for each match
            tempArr = arr[j]
            keys = ['yes', 'no']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 8:
            //cornerou8p5 values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 9:
            //cornerou11p5 values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 10:
            //wineither values for each match
            tempArr = arr[j]
            keys = ['1', '2']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 11:
            //winboth values for each match
            tempArr = arr[j]
            keys = ['1', '2']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 12:
            //over1p5home values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 13:
            //over1p5away values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 14:
            //over0p5home values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 15:
            //over0p5away values for each match
            tempArr = arr[j]
            keys = ['ov', 'un']
            action(tempArr, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break


          }
        }

      }

      epl_vals.push(liv_vals, manc_vals, manu_vals)
      return epl_vals
      //tested ok
    }
    return returnedArray
  }

  const ids = ['England', 'Spain', 'Germany', 'Italy']
  ids.forEach(setClick)

}



window.onload = main