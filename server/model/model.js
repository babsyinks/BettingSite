const mongoose = require('mongoose')
const validateVals = require('validator')
const individualLeaguesSchema = new mongoose.Schema({
            teams:[{
                    team:String,
                    rating:Number
                }],
            games:[{homeTeam:String,awayTeam:String,one:String,x:String,two:String,oneX:String,oneTwo:String,xTwo:String,
                    over2pt5:String,under2pt5:String,over1pt5:String,under1pt5:String,over3pt5:String,under3pt5:String,
                    over4pt5:String,under4pt5:String,redcardYes:String,redcardNo:String,penaltyYes:String,penaltyNo:String,
                    cornerOver8pt5: String,cornerUnder8pt5: String,cornerOver11pt5: String,cornerUnder11pt5: String,gg: String,
                    ng: String,winEitherOne:String,winEitherTwo:String,winBothOne:String,winBothTwo:String,over1pt5Home:String,
                    under1pt5Home:String,over1pt5Away:String,under1pt5Away:String,over0pt5Home:String,under0pt5Home:String,
                    over0pt5Away:String,under0pt5Away:String
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
        required:[true,'Email is required'],
        validate:{
            validator:validateVals.isEmail,
            message:(v)=>`${v.value} is an invalid email`
        }
    },

    password:{
        type:String,
        trim:true,
        required:[true,'Password is required']
    },

    allLeagues:countrySchema 

})

const User = mongoose.model('User',userSchema)
const IndividualLeagues = mongoose.model('IndividualLeagues',individualLeaguesSchema)
const Leagues = mongoose.model('League',leaguesSchema)
const Country = mongoose.model('Country',countrySchema)

module.exports = {User,IndividualLeagues,Leagues,Country}

