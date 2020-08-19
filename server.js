const express = require('express')
const path = require('path')
const app = express()
const accessRoutes = require('./server/routes/authRoutes')

require('./server/db/db')

app.use(express.static(path.resolve(__dirname,'client')))

app.use('/access',accessRoutes)

app.listen(3000,()=>{
    console.log('Listening on port 3000')
})