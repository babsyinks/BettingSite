const jwt = require('jsonwebtoken')
const path = require('path')
const {User} = require('../model/model.js')
require('dotenv').config({path:path.join('..','..','.env')});
require('dotenv').config({ debug: process.env.DEBUG })
const auth = async (req,res,next)=>{
    try {
    const token = req.headers['x-auth-token']
    const verifyObj = jwt.verify(token,process.env.TOKEN_SECRET)
    const user = await User.findById(verifyObj.user.id)

    if(!user){
        return res.redirect('/access/signIn')
    }

    req.user = verifyObj.user
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');   
    next()  
    } catch (error) {
        return res.redirect('/access/signIn')
    }
}

module.exports = auth