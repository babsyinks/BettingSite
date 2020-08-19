const mongoose = require('mongoose')

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

