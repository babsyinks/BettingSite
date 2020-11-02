//'/bets/placeBets'
const express = require('express')
const path = require('path')
const auth = require('../middlewares/auth')
const{User} = require('../model/model')
const fetchMatchesWithOdds = require('../utilityFunctions/fetchMatchesWithOdds')
const Router = express.Router()
Router.use(express.json())
Router.use(express.static(path.resolve(__dirname,'..','..','src')))

Router.get('/placeBets',auth,(req,res)=>{
    res.json({message:'Welcome'})
    })

Router.post('/matches',auth,async(req,res)=>{ 
const{country,league} = req.body
const user = await User.findById(req.user.id)
const allCountries = user.allLeagues.countries
const matchesWithOdds = fetchMatchesWithOdds(country,league,allCountries)
res.json(matchesWithOdds) 
})

module.exports = Router