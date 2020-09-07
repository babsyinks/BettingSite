const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const ENGLISH_LEAGUES = require('../data/england')
const SPANISH_LEAGUES = require('../data/spain')
const ITALIAN_LEAGUES = require('../data/italy')
const GERMAN_LEAGUES = require('../data/germany')
const BET_TYPE_WITH_ODDS = require('../data/data')

const {User,Country} = require('../model/model')
const createEachLeague = require('../utilityFunctions/individualLeaguesRunner')

const Router = express.Router()

Router.use(express.json())

Router.get('/signUp',(req,res)=>{
    res.sendFile(path.resolve('client','signUp.html'))
})

Router.get('/signIn',(req,res)=>{
    res.sendFile(path.resolve('client','signIn.html'))
})

Router.post('/signUp', async(req,res)=>{
 
 const englishLeagues = createEachLeague('english',ENGLISH_LEAGUES)
 const spanishLeagues = createEachLeague('spanish',SPANISH_LEAGUES)
 const germanLeagues = createEachLeague('german',GERMAN_LEAGUES)
 const italianLeagues = createEachLeague('italian',ITALIAN_LEAGUES)

 const countriesLeagues = new Country({countries:[englishLeagues,spanishLeagues,germanLeagues,italianLeagues]})
 
 const {email,password} = req.body

 const user = {email,password,allLeagues:countriesLeagues}
    
 const salt = await bcrypt.genSalt(10)
 user.password = await bcrypt.hash(password,salt)

 const newUser = new User(user)

 await newUser.save()
 const token = jwt.sign({user:{id:newUser.id}},'sdahufdfbdfbwldb',{expiresIn:24*60*60})

    res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60)})
    
    res.json({token})
})

Router.post('/signIn',async (req,res)=>{

    const{email,password} = req.body

    try {

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).send({message:'Invalid Credentials'})
    }

    const isCorrect = await bcrypt.compare(password,user.password)
    
    if(!isCorrect){
       return  res.status(400).send({message:'Invalid Credentials'})
    }

    const token = jwt.sign({user:{id:user.id}},'sdahufdfbdfbwldb',{expiresIn:24*60*60})
    res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60)})
    res.json({token})
    } catch (error) {
        res.status(400).send({message:'Sign in failed.'})
    }


    
})

module.exports = Router
