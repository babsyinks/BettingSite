const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
require('dotenv').config({path:path.join('..','..','.env')});

require('dotenv').config({ debug: process.env.DEBUG })
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
    try {
        const {email,password} = req.body
        if(!email || !password){
            return res.status(400).send({
                error:'Invalid Input' 
            })
        }
        
        const englishLeagues = createEachLeague('english',ENGLISH_LEAGUES)
        const spanishLeagues = createEachLeague('spanish',SPANISH_LEAGUES)
        const germanLeagues = createEachLeague('german',GERMAN_LEAGUES)
        const italianLeagues = createEachLeague('italian',ITALIAN_LEAGUES)

        const countriesLeagues = new Country({countries:[englishLeagues,spanishLeagues,germanLeagues,italianLeagues]})

        const user = {email,password,allLeagues:countriesLeagues}
            
        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password,salt)

        const newUser = new User(user)

        await newUser.save()
        
        const token = jwt.sign({user:{id:newUser.id}},process.env.TOKEN_SECRET,{expiresIn:24*60*60})

            res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60)})
            
           return res.json({token})
    } catch (error) {
        String.prototype.inc
        const err = (error.errors !== undefined) && (error.errors['email'].message||error.errors['password'].message)
        if(error.message.includes('E11000 duplicate key error collection')){
            return res.status(400).send({error:'The Email You Provided Already Exists'})
        }
        if(err){
           return res.status(400).send({error:`${err}`})
        }
        else{
           return res.status(500).send({error:'Error In Account Creation.Enter The Proper Information Or Try Again Later'})
        }
    }
})

Router.post('/signIn',async (req,res)=>{

    const{email,password} = req.body

    try {

    const user = await User.findOne({email})

    if(!user){
        return res.status(400).send({error:'Invalid Credentials'})
    }

    const isCorrect = await bcrypt.compare(password,user.password)
    
    if(!isCorrect){
       return  res.status(400).send({error:'Invalid Credentials'})
    }

    const token = jwt.sign({user:{id:user.id}},process.env.TOKEN_SECRET,{expiresIn:24*60*60})
    res.cookie('token',token,{httpOnly:true,expires:new Date(Date.now() + 24*60*60)})
    res.json({token})
    } catch (error) {
        res.status(404).send({error:'Sign in failed.'})
    }


    
})

Router.get('/signOut',(req,res)=>{
    res.cookie('token',{expires:Date.now()})
    res.send({logout:true})
})

module.exports = Router
