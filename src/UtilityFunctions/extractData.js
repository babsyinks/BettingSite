export default function extractData(country,league) {

    switch (country) {

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
        if (ind === 0) { //exexute([],'Arsenal vs Chelsea','m2','m3','m4')
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
      //'Arsenal vs Chelsea' odd objects
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
      //array of 'Arsenal vs Chelsea' odds
      vals.push(main, gg_ng, ou1p5, ou2p5, ou3p5, ou4p5, redCard, penalty, conerou8p5, conerou11p5, winEither, winBoth, ou1p5Home, ou1p5Away, ou0p5Home, ou0p5Away)

      epl_vals.push(vals)
      var liv_vals = []
      var manc_vals = []
      var manu_vals = []

      //all other match odds
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
        let MatchOdds = []
        let match = ''

        switch (i) {
        case 0:
          //liverpool match values
          MatchOdds = odds[i]
          match = match2
          break
        case 1:
          //man city match values
          MatchOdds = odds[i]
          match = match3
          break
        case 2:
          //man utd match values
          MatchOdds = odds[i]
          match = match4
          break

        }
        for (let j = 0; j < vals.length; j++) {
          //make a copy of 'Arsenal vs Chelsea' odd object template
          let clone = Object.assign({}, vals[j])
          //overwrite the match from 'Arsenal vs Chelsea' to current match
          clone.match = match
          let tempMatchOdds = []
          switch (j) {
          case 0:
            //main values of each match
            tempMatchOdds = MatchOdds[j]
            var keys = ['1', 'X', '2', '1X', '12', 'X2']
            
//action(['1.30', '4.00', '6.70', '1.02', '1.11', '2.99'],['1', 'X', '2', '1X', '12', 'X2'],[],[],[],{name: 'main',match: match,'1': '2.30','X': '3.40','2': '2.90','1X': '1.40','12': '1.33','X2': '1.56'},0)            
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break
          case 1:
            //gg values of each match
            tempMatchOdds = MatchOdds[j]
            keys = ['gg', 'ng']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 2:
            //ou1p5 values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 3:
            //ou2p5 values for each match  
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 4:
            //ou3p5 values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 5:
            //ou4p5 values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 6:
            //redcard values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['yes', 'no']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 7:
            //penalty values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['yes', 'no']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 8:
            //cornerou8p5 values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 9:
            //cornerou11p5 values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 10:
            //wineither values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['1', '2']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 11:
            //winboth values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['1', '2']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 12:
            //over1p5home values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 13:
            //over1p5away values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 14:
            //over0p5home values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break

          case 15:
            //over0p5away values for each match
            tempMatchOdds = MatchOdds[j]
            keys = ['ov', 'un']
            action(tempMatchOdds, keys, liv_vals, manc_vals, manu_vals, clone, i)
            break
          }
        }
      }
/*  */
//push arrs of form [{name: 'main',match: match1,'1': '2.30','X': '3.40','2': '2.90','1X': '1.40','12': '1.33','X2': '1.56'},{name: 'gg_ng',match: match1,gg: '1.65',ng: '2.46' },etc] to epl_vals

      epl_vals.push(liv_vals, manc_vals, manu_vals)
      return epl_vals
      //tested ok
    }
    return returnedArray
  }
