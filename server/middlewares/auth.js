const jwt = require('jsonwebtoken')
const path = require('path')
require('dotenv').config({path:path.join('..','..','.env')});
require('dotenv').config({ debug: process.env.DEBUG })
const auth = (req,res,next)=>{

    try {

    const token = req.header('X-Auth-Token') || req.cookies.token

    if(!token){
        return res.redirect('/access/signIn')
    }
    const verifyObj = jwt.verify(token,process.env.TOKEN_SECRET)

    req.user = verifyObj.user

    next()  
    } catch (error) {
        return res.redirect('/access/signIn')
    }
}

module.exports = auth