const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const accessRoutes = require('./server/routes/authRoutes')
const betRoutes = require('./server/routes/betRoutes')
const generalRoutes = require('./server/routes/generalRoutes')
const displayBetsRoutes = require('./server/routes/displayBetsRoutes')
const port = process.env.PORT||3000
require('./server/db/db')

app.use(cookieParser())
app.use(express.static(path.resolve(__dirname,'client')))

app.use('/access',accessRoutes)
app.use('/bets',betRoutes) 
app.use('/display',displayBetsRoutes)
app.use(generalRoutes)
app.get('*',(req,res)=>{
    res.redirect('/')
})
app.use((err,req,res,next)=>{
    res.status(500).send({message:err.message})
})
  
app.listen(port,()=>{
    console.log('Listening on port 3000')
})