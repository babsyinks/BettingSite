const express = require('express')
const path = require('path')
const Router = express.Router()
const auth = require('../middlewares/auth')

const assetsPath = path.resolve(__dirname,'..','..','src')

Router.use(express.static(path.resolve(assetsPath)))

Router.get('/admin',auth,(req,res)=>{
    res.sendFile(path.resolve(assetsPath,'admin.html'))
})

Router.get('/bet',auth,(req,res)=>{
    res.sendFile(path.resolve(assetsPath,'displayOdds.html'))
})

Router.get('/home',auth,(req,res)=>{
    res.sendFile(path.resolve(assetsPath,'home.html'))
})

Router.get('/registrationSuccess',auth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','..','client','access','registrationSuccess.html'))
}) 

module.exports = Router