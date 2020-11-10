const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const app = express()
const accessRoutes = require('./server/routes/authRoutes')
const betRoutes = require('./server/routes/betRoutes')
const generalRoutes = require('./server/routes/generalRoutes')
const displayBetsRoutes = require('./server/routes/displayBetsRoutes')
require('./server/db/db')

app.set('view engine','ejs')
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname,'client')))

app.use('/access',accessRoutes)
app.use('/bets',betRoutes) 
app.use('/display',displayBetsRoutes)
app.use(generalRoutes)

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})