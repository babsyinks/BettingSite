
var teamStatus = {
  home:'Arsenal',
  away:'Aston Villa'
}

//english leagues
const eplArray = ['Arsenal','Aston Villa','Brighton','Burnley','Chelsea',
                  'Crystal Palace','Everton','Fulham','Leeds United','Leicester City','Liverpool',
                  'Manchester City','Manchester United','Newcastle United','Sheffield United',
                  'Southampton','Tottenham Hotspur','West Brom','West Ham','Wolves']

const championshipArray = ['Barnsley','Birmingham City','Blackburn Rovers','Bournemouth','Brentford','Bristol City','Cardiff City',
                  'Coventry City','Derby County','Huddersfield Town','Luton Town','Middlesbrough','Millwall','Norwich City',
                  'Nottingham Forest','Preston North End','Queens Park Rangers','Reading','Rotherham United','Swansea City',
                  'Stoke City','Watford','Wycombe Wanderers','Sheffield Wednesday']

const league1Array = ['Accrington Stanley','AFC Wimbledon','Blackpool','Bristol Rovers','Burton Albion','Charlton Athletic',
            'Crewe Alexandra','Doncaster Rovers','Fleetwood Town','Gillingham','Hull City','Ipswich Town','Lincoln City',
            'Milton Keynes Dons','Northampton Town','Oxford United','Peterborough United','Plymouth Argyle','Portsmouth',
            'Rochdale','Shrewsbury Town','Sunderland','Swindon Town','Wigan Athletic']

const league2Array = ['Barrow','Bolton Wanderers','Bradford City','Cambridge United','Carlisle United','Cheltenham Town',
            'Colchester United','Crawley Town','Exeter City','Forest Green Rovers','Grimsby Town','Harrogate Town',
            'Leyton Orient','Macclesfield Town','Mansfield Town','Morecambe','Newport County','Oldham Athletic','Port Vale',
            'Salford City','Scunthorpe United','Southend United','Tranmere Rovers','Walsall']


 //spanish leagues
const laLigaArray = ['Alaves','Athletic Bilbao','Athletico Madrid','Barcelona','Cadiz','Celta Vigo',
                     'Eibar','Getafe','Granada','Huesca','Levante','Osasuna','Real Betis','Real Madrid',
                     'Real Sociedad','Real Zaragoza','Sevilla','Valencia','Valladolid','Villareal']

const laLiga2Array = ['Albacete','Alcorcon','Cartagena','Castellon','Espanyol','Fuenlabrada','Las Palmas','Leganes',
                      'Logrones','Lugo','Malaga','Mallorca','Mirandes','Oviedo','Ponferradina','Rayo Vallecano',
                      'Sabadell','Sporting Gijon','Tenerife','Unaca','Yeteda','Zeteje']

const segundaBArray = ['Atletico Baleares','Atletico Madrid B','Celta Vigo B','Coruxo','Getafe B','Ibiza','Internacional',
                       'Langreo','Las Palmas Atletico','Las Rozas','Marino Luanco','Melilla','Oviedo B','Pena Deportiva',
                       'Pontevedra','Racing Ferrol','Rayo Majadahonda','Real Madrid Castilla','San Sebastian de los Reyes',
                       'Sporting Gijon B']

//german leagues
const bundesligaArray = ['Arminia Bielefeld','Ausburg','Bayer Leverkusen','Bayern Munich','Borussia Dortmund',
                         'Borussia Monchengladbach','Eintracht Frankfurt','Freiburg','Hertha Berlin',
                         'Hoffenheim','Koln','Mainz 05','RB Leipzig','Schalke 04','Union Berlin','VfB Stuttgart',
                         'VfL Wolfsburg','Werder Bremen']

const bundesliga2Array = ['Darmstadt 98','Eintracht Braunschweig','Erzgebirge Aue','FC St. Pauli','Fortuna Dusseldorf','Greuther Furth',
                          'Hamburger SV','Hannover 96','Holstein Kiel','Jahn Regensburg','Karlsruher SC','SC Paderborn','SV Sandhausen',
                          'VfL Bochum','VfL Osnabruck','Wurzburger Kickers','1. FC Heidenheim','1. FC Nurnberg']

const liga3Array = ['Bayern Munich II','Dynamo Dresden','FC Ingolstadt','FSV Zwickau','Hallescher FC','Hansa Rostock','KFC Uerdingen',
                    'MSV Duisburg','SC Verl','SpVgg Unterhaching','SV Meppen','Turkgucu Munchen','VfB Lubeck','Viktoria Koln',
                    'Waldhof Mannheim','Wehen Wiesbaden','1. FC Kaiserslautern','1. FC Magdeburg','1. FC Saarbrucken','1860 Munich']

//Italian Leagues
const serieAArray = ['AC Milan','Atalanta','Benevento','Bologna','Cagliari','Crotone','Fiorentina','Genoa','Hellas Verona',
                      'Inter Millan','Juventus','Lazio','Napoli','Parma','Roma','Sampdoria','Sassuolo','Spezia','Torino','Udinese']

const serieBArray = ['Ascoli','Brescia','Cosenza','Cremonese','Empoli','Lecce','Monza','Pisa','Reggiana','Reggina','Salernitana','SPAL',
                     'Venezia','Vicenza','Virtus Entella','Vodotan','Wenetaza','Wicita','Yetizi','Zebedeta']

const serieCArray = ['Albinoleffe','Alessandria','Arezzo','Avellino','Bari','Bitonto','Carpi','Carrarese','Casertana','Catania','Catanzaro',
                     'Cavese','Cesena','Como','Fano','Feralpisalò','Fermana','Grosseto','Gubbio','Imolese','Juventus Under 23','Juve Stabia']



function myAdmin() {

  let country = document.getElementById('country')
  loadTeams(eplArray)

  function addOptions(arr) {
    var sel1 = document.createElement('select')

    sel1.setAttribute('name', 'leagues')
    sel1.setAttribute('id', 'leagues')

    for (let val of arr) {
      let txtN = document.createTextNode(`${val}`)
      let opt = document.createElement('option')
      opt.appendChild(txtN)
      sel1.appendChild(opt)
    }

    return sel1
  }

  function appendToSpan(elem) {
    let span = document.getElementById('sp')
    span.removeChild(span.getElementsByTagName('select')[0])
    span.appendChild(elem)
    attachLeaguesEventListeners()
  }

  function appendEach(arr) {
    var elem = addOptions(arr)
    appendToSpan(elem)
    clearTextFields()
    //addLgChangeEvent()

  }


function homeTeamChangeHandler(e){

  const arr = Array.from(e.target.children)
  teamStatus.home = e.target.value

  for(let team of arr){
  team.disabled = (team.value === teamStatus.away)
}

}

function awayTeamChangeHandler(e){
  const arr = Array.from(e.target.children)
  teamStatus.away = e.target.value

  for(let team of arr){
  team.disabled = (team.value === teamStatus.home)
}

 
}

/* let x = document.createElement('select')
x.addEventListener('click',function(e){
  
}) */
//load teams to the home and away span elements
function loadTeams(arrOfTeams){

let homeSpan = document.getElementById('homeSpan')
let awaySpan = document.getElementById('awaySpan')

let homeTeams = document.createElement('select')

homeTeams.addEventListener('click',homeTeamChangeHandler)

homeTeams.id = 'home'
homeTeams.name = 'home'

let awayTeams = document.createElement('select')

awayTeams.addEventListener('click',awayTeamChangeHandler)

awayTeams.id = 'away'
awayTeams.name = 'away'

if(homeSpan.hasChildNodes() && awaySpan.hasChildNodes()){
homeSpan.removeChild(homeSpan.getElementsByTagName('select')[0])
awaySpan.removeChild(awaySpan.getElementsByTagName('select')[0]) 
}

let optionHome,optionAway

arrOfTeams.forEach(function(team,i){

optionHome = document.createElement('option')
optionAway = document.createElement('option')

let textNodeHome = document.createTextNode(team)
let textNodeAway = document.createTextNode(team)

optionHome.value = team
optionHome.disabled = (team === teamStatus.away)

if(i === 0){
 optionHome.selected = true
 teamStatus.home = team
}

optionHome.appendChild(textNodeHome)

optionAway.value = team
optionAway.disabled = (team === teamStatus.home)
if(i === 1){
  optionAway.selected = true
  teamStatus.away = team
}
optionAway.appendChild(textNodeAway)

homeTeams.appendChild(optionHome)
awayTeams.appendChild(optionAway)

})
homeSpan.appendChild(homeTeams)
awaySpan.appendChild(awayTeams)

}


function clearTextFields(){
  let txtNds = document.querySelectorAll('input[type = text]')
  for (let i of txtNds) {
    i.value = ''
  }
}
  country.addEventListener('change', function() {
   clearTextFields()
    let arr
    
    switch (country.value) {
    case 'England':
      arr = ['EPL', 'Championship', 'League 1', 'League 2']
      appendEach(arr)
      loadTeams(eplArray)
      break
    case 'Spain':
      arr = ['La Liga', 'La Liga2', 'Segunda B']
      appendEach(arr)
      loadTeams(laLigaArray)
      break
    case 'Germany':
      arr = ['1.Bundesliga', '2.Bundesliga', '3.Liga']
      appendEach(arr)
      loadTeams(bundesligaArray)
      break
    case 'Italy':
      arr = ['Serie A', 'Serie B', 'Serie C']
      appendEach(arr)
      loadTeams(serieAArray)
      break
    default:
      console.log(country.value)
    }

  })

  

  function attachLeaguesEventListeners(){

    const leagues = document.getElementById('leagues')

      leagues.addEventListener('change',function(){

    clearTextFields()

    switch(leagues.value){

      case 'EPL':
        loadTeams(eplArray)
        break
      case 'Championship':
        loadTeams(championshipArray)
        break
      case 'League 1':
        loadTeams(league1Array)
        break
      case 'League 2':
        loadTeams(league2Array)
        break

      case 'La Liga':
        loadTeams(laLigaArray)
        break

      case 'La Liga2':
        loadTeams(laLiga2Array)
        break
      case 'Segunda B':
        loadTeams(segundaBArray)
        break
      case '1.Bundesliga':
        loadTeams(bundesligaArray)
        break
      case '2.Bundesliga':
        loadTeams(bundesliga2Array)
        break
      case '3.Liga':
        loadTeams(liga3Array)
        break
      case 'Serie A':
        loadTeams(serieAArray)
        break
      case 'Serie B':
        loadTeams(serieBArray)
        break
      case 'Serie C':
        loadTeams(serieCArray)
        break
      default:
        console.log(leagues.value)
    }
  })
  }

  attachLeaguesEventListeners()



 /*  function addLgChangeEvent() {
    let leagueSelector = document.getElementById('leagues')
    leagueSelector.addEventListener('change', function() {
      let txtNodes = document.querySelectorAll('input[type = text]')
      for (let i of txtNodes) {
        i.value = ''
      }
    })
  } */

  //addLgChangeEvent()
  let grabData = closureOnData()
  let ok = document.getElementById('ok')
  ok.addEventListener('click', grabData)
  /* let done = document.getElementById('done')
  done.addEventListener('click', function() {
    window.location.href = 'displayOdds.html'
  }) */
}

function assignObj() {
  var prototype = {
    one: null,
    x:null,
    two: null,
    oneX: null,
    oneTwo: null,
    xTwo: null,
    over2pt5: null,
    under2pt5: null,
    over1pt5: null,
    under1pt5: null,
    over3pt5: null,
    under3pt5: null,
    over4pt5: null,
    under4pt5: null,
    redcardYes: null,
    redcardNo: null,
    penaltyYes: null,
    penaltyNo: null,
    cornerOver8pt5: null,
    cornerUnder8pt5: null,
    cornerOver11pt5: null,
    cornerUnder11pt5: null,
    gg: null,
    ng: null
  }
  let epl, championship, league1, league2, laLiga, laLiga2, segundaB, bundesliga, bundesliga2, Liga3, serieA, serieB, serieC

  let engLeague = [epl, championship, league1, league2]
  let spLeague = [laLiga, laLiga2, segundaB]
  let gerLeague = [bundesliga, bundesliga2,Liga3]
  let itLeague = [serieA, serieB, serieC]

  let leagues = [engLeague, spLeague, gerLeague, itLeague]

  // copy the prototype template object to each league 
  for (let i = 0; i < leagues.length; i++) {
    for (let j = 0; j < leagues[i].length; j++) {
      leagues[i][j] = Object.assign({}, prototype)
    }
  }

  return leagues
}

function closureOnData() {

  let leagues = assignObj()

  let engLeague = leagues[0],
    spLeague = leagues[1],
    gerLeague = leagues[2],
    itLeague = leagues[3]

  return function() {

    let country = document.getElementById('country').value
    let lg = document.getElementById('leagues').value

    //get the selected object by using the index of the array whose value is same as the one selected on the form
    function check(arr, arrObj) {
      let lgObj
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] === lg) {
          lgObj = arrObj[i]
          break
        }
      }
      return lgObj
    }

    function validator() {
      
      let odds = document.querySelectorAll('input[class = odds]')
      for (let v of odds) {
        // v.value.replace(/^0+/, '')
        //convert the string input to a number
        let numVal = +v.value
        //validate numeric inputs for odds
        if (Number.isNaN(numVal) || numVal === 0 || Math.sign(numVal) !== 1 || numVal <= 1) {
          throw new Error('Invalid odd.Only positive numbers above one are allowed')
        }
      }

    }
    //get text input from the page
    function getTexts() {

      validator()

      let nodes = document.querySelectorAll('input[type = text]')
      let vals = []

      for (let v of nodes) {
        if (/^0+/.test(`${v.value}`)) {
          v.value = parseInt(`${v.value}`, 10)
        }

        vals.push(v.value)
      }

      return vals
    }

    function assignObjVals(obj, arrVals) {
      let keysArray = []
      let tempKey
      for (let key in obj) {
        keysArray.push(key)

      }

      for (let i = 0; i < arrVals.length; i++) {
        tempKey = keysArray[i]

        obj[tempKey] = arrVals[i]
      }
      obj.homeTeam = document.getElementById('home').value
      obj.awayTeam = document.getElementById('away').value

    }

    function runAll(arr, arr2) {
      var lgObj = check(arr, arr2)

      try {
        var textVals = getTexts()
        assignObjVals(lgObj, textVals)
        alert(lgObj.homeTeam)
        alert(lgObj.over1pt5)
        alert(lgObj.gg)
        const proceedToBetPage = confirm('Data Saved! Will You like to go to the public betting page of this site?')
        if(proceedToBetPage){
          window.location.href = 'displayOdds.html'
        }
      } catch (error) {
        alert(error)
      }

    }
    switch (country) {

    case 'England':
      var arr = ['EPL', 'Championship', 'League 1', 'League 2']
      var arr2 = engLeague
      runAll(arr, arr2)
      break

    case 'Spain':
      arr = ['La Liga', 'La Liga2', 'Segunda B']
      arr2 = spLeague
      runAll(arr, arr2)
      break

    case 'Germany':
      arr = ['1.Bundesliga', '2.Bundesliga', '3.Liga']
      arr2 = gerLeague
      runAll(arr, arr2)
      break

    case 'Italy':
      arr = ['Serie A', 'Serie B', 'Serie C']
      arr2 = itLeague
      runAll(arr, arr2)
      break
    default:
      alert('oops')
      break
    }

  }
}
window.onload = myAdmin