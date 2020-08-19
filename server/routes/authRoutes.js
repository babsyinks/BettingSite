const express = require('express')
const path = require('path')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const fs = require('fs')
const Router = express.Router()

const ENGLISH_LEAGUES = path.join(__dirname,'..','data','england.json')
const SPANISH_LEAGUES = path.join(__dirname,'..','data','spain.json')
const GERMAN_LEAGUES = path.join(__dirname,'..','data','germany.json')
const ITALY_LEAGUES = path.join(__dirname,'..','data','italy.json')
const BET_TYPE_WITH_ODDS = path.join(__dirname,'..','data','data.json')

const {User} = require('../model/model')

Router.use(express.urlencoded({extended:true}))

Router.get('/signUp',(req,res)=>{
    res.sendFile(path.resolve('client','signUp.html'))
})

Router.get('/signIn',(req,res)=>{
    res.sendFile(path.resolve('client','signIn.html'))
})

Router.post('/signUp', async(req,res)=>{
 const {email,password} = req.body
 const user = {email,password}
 const salt = await bcrypt.genSalt(10)
 user.password = await bcrypt.hash(password,salt)

 const newUser = new User(user)

 await newUser.save()
res.send(newUser)
})

Router.post('/signIn',(req,res)=>{

})

module.exports = Router
