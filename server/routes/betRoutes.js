const express = require('express')
const auth = require('../middlewares/auth')
const path = require('path')
const{User} = require('../model/model')
const Router = express.Router()
const processNewMatch = require('../utilityFunctions/processNewMatchPost')
const processEditMatch = require('../utilityFunctions/processEditMatch')
const processAndPostEditedMatch = require('../utilityFunctions/processPostedEditedValues')
const processDeleteMatch = require('../utilityFunctions/processDeleteMatch')
Router.use(express.json())

Router.use(express.static(path.resolve(__dirname,'..','..','src')))

Router.get('/setOdds',auth,(req,res)=>{
res.json({message:'Welcome'})
})

Router.post('/setOdds',auth,async(req,res)=>{
const user = await User.findById(req.user.id)
try {
    const resultOfProcess = processNewMatch(req.body,user.allLeagues.countries)

    if(typeof resultOfProcess === 'string'){
        return res.json({message:resultOfProcess})
    }
    user.allLeagues.countries = resultOfProcess
    await user.save()
    res.json({message:''})
} catch (err) {
    res.status(400).send({message:err.message})
}

})

Router.post('/editOdds',auth,async(req,res)=>{
    const user = await User.findById(req.user.id)
    try {
        const objToEdit = processEditMatch(req.body,user.allLeagues.countries)

        objToEdit?res.json(objToEdit):res.json({message:"You can't edit a game that hasn't been added yet"}) 
    } catch (err) {
        res.status(400).send({message:err.message})
    }
    

})

Router.put('/editOdds',auth,async(req,res)=>{
    const user = await User.findById(req.user.id)
    try {
        const editedArr = processAndPostEditedMatch(req.body,user.allLeagues.countries)
        user.allLeagues.countries = editedArr
        await user.save()
        res.json({message:''})
    } catch (err) {
        res.status(400).send({message:err.message})
    }
    
}) 

Router.delete('/deleteOdds',auth,async(req,res)=>{
    const user = await User.findById(req.user.id)
    try {
        const result = processDeleteMatch(req.body,user.allLeagues.countries)
        if(typeof result === 'string'){
            return res.json({message:result})
        }
        user.allLeagues.countries = result
        await user.save()
        res.json({message:'Game Successfully Deleted'})
    } catch (err) {
        res.status(400).send({message:err.message})
    }
})

module.exports = Router

