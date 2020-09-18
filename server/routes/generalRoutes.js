const express = require('express')
const path = require('path')
const Router = express.Router()
const auth = require('../middlewares/auth')

Router.use(express.static(path.resolve(__dirname,'..','..','src')))

Router.get('/admin',auth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','..','src','admin.html'))
})

Router.get('/home',auth,(req,res)=>{
    res.sendFile(path.resolve(__dirname,'..','..','src','home.html'))
})

module.exports = Router