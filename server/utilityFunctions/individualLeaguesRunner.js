const {IndividualLeagues,Leagues} = require('../model/model')
//to be deleted later 
const individualLeaguesSchema = new mongoose.Schema({
    league:{teams:[{
                    team:String,
                    rating:Number
                }],
            games:[{homeTeam:String,awayTeam:String,one:Number,x:Number,two:Number,oneX:Number,oneTwo:Number,xTwo:Number,
                    over2pt5:Number,under2pt5:Number,over1pt5:Number,under1pt5:Number,over3pt5:Number,under3pt5:Number,
                    over4pt5:Number,under4pt5:Number,redcardYes:Number,redcardNo:Number,penaltyYes:Number,penaltyNo:Number,
                    cornerOver8pt5: Number,cornerUnder8pt5: Number,cornerOver11pt5: Number,cornerUnder11pt5: Number,gg: Number,ng: Number
                }]
}}) 

const createEachLeague = (league,leagueObj)=>{

    let teamRating = {}
    // example = [eplArray, championshipArray,league1Array,league2Array]
    const arrayKeys = leagueObj.keys()

    switch(league){
        case 'english':
            const englishLeagues = []

            teamRating = {  ten:["Manchester City","Liverpool","Brentford","Swansea City","Sunderland",
                             "Portsmouth","Bolton Wanderers","Tranmere Rovers"],
                            nine:["Chelsea","Manchester United","Norwich City","Queens Park Rangers","Lincoln City","Hull City","Bradford City","Carlisle United"],
                            eight:["Arsenal","Tottenham Hotspur","Bournemouth","Middlesbrough","Doncaster Rovers","Wigan Athletic","Macclesfield Town","Mansfield Town"],
                            seven:["Everton","Leicester City","Nottingham Forest","Stoke City","Watford","Blackpool","Forest Green Rovers","Grimsby Town"],
                            six:["Wolves","Sheffield United","Newcastle United","Birmingham City","Blackburn Rovers","Fleetwood Town","Charlton Athletic","Newport County","Oldham Athletic"]}

            const teamRatingKeys = teamRating.keys()
            arrayKeys.forEach((division)=>{

                //array of obj of form [{team,rating}]
               let lg = leagueObj[division].map((team)=>{
                    
                        let val = null
                        for (const key of teamRatingKeys) {
                            if(teamRating[key].include(team)){
                                val = {
                                    team,
                                    rating:key
                                    }

                                break
                       } 
                    }

                   if(!val){
                      const randNum = Math.floor(Math.random()*5) + 1
                      val = {team,rating:randNum}
                   }

                   return val
                })

                englishLeagues.push(lg)

                englishLeagues
            })
            break
        case 'spanish':
            const spanishLeagues = []

            teamRating = {ten:["Barcelona","Real Madrid","Espanyol","Malaga","Rayo Majadahonda","Real Madrid Castilla"],
                          nine:["Athletico Madrid","Sevilla","Valencia","Las Palmas","Leganes","Atletico Madrid B","Celta Vigo B"],
                          eight:["Getafe","Villareal","Mallorca","Mirandes","Coruxo","Ibiza"],
                          seven:["Real Sociedad","Real Betis","Ponferradina","Rayo Vallecano","Oviedo B","Pena Deportiva"],
                          six:["Alaves","Eibar","Sporting Gijon","Tenerife","Pontevedra","Racing Ferrol"]} 
            break
        case 'german':
            const germanLeagues = []

            teamRating = {ten:["Bayern Munich","Borussia Dortmund","Hamburger SV","Hannover 96","1860 Munich","FC Ingolstadt"],
                          nine:["Bayer Leverkusen","RB Leipzig","VfL Bochum","VfL Osnabruck","Bayern Munich II","Dynamo Dresden"],
                          eight:["Eintracht Frankfurt","Hoffenheim","Schalke 04","Fortuna Dusseldorf","Greuther Furth","Hallescher FC","Hansa Rostock"],
                          seven:["Borussia Monchengladbach","Werder Bremen","1. FC Heidenheim","1. FC Nurnberg","SV Meppen","Turkgucu Munchen"],
                          six:["Hertha Berlin","VfL Wolfsburg","Darmstadt 98","Eintracht Braunschweig","KFC Uerdingen","Viktoria Koln"]} 
            break
        case 'italian':
            const italianLeagues = []

            teamRating = {ten:["Juventus","Napoli","Brescia","Empoli","Juve Stabia","Catanzaro"],
                          nine:["Inter Millan","Roma","Venezia","Vicenza","Imolese","Juventus Under 23"],
                          eight:["AC Milan","Atalanta","Lazio","Lecce","Arezzo","Avellino"],
                          seven:["Sampdoria","Fiorentina","Reggiana","Reggina","Carpi","Cesena"],
                          six:["Torino","Udinese","Salernitana","SPAL","Fermana","Grosseto"]} 
            break
        default:

    }

}
