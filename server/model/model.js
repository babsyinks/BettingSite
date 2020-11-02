const mongoose = require('mongoose')

const individualLeaguesSchema = new mongoose.Schema({
            teams:[{
                    team:String,
                    rating:Number
                }],
            games:[{homeTeam:String,awayTeam:String,one:String,x:String,two:String,oneX:String,oneTwo:String,xTwo:String,
                    over2pt5:String,under2pt5:String,over1pt5:String,under1pt5:String,over3pt5:String,under3pt5:String,
                    over4pt5:String,under4pt5:String,redcardYes:String,redcardNo:String,penaltyYes:String,penaltyNo:String,
                    cornerOver8pt5: String,cornerUnder8pt5: String,cornerOver11pt5: String,cornerUnder11pt5: String,gg: String,ng: String
                }]

})

const leaguesSchema = new mongoose.Schema({
    leagues:[individualLeaguesSchema]

})

const countrySchema = new mongoose.Schema({
    countries:[leaguesSchema]
    })

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
        required:true
       /*  validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email')
            }
        } */
    },

    password:{
        type:String,
        trim:true,
        minlength:6,
        required:true
    },

    allLeagues:countrySchema

})

const User = mongoose.model('User',userSchema)
const IndividualLeagues = mongoose.model('IndividualLeagues',individualLeaguesSchema)
const Leagues = mongoose.model('League',leaguesSchema)
const Country = mongoose.model('Country',countrySchema)

module.exports = {User,IndividualLeagues,Leagues,Country}

