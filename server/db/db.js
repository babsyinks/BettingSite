const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)
const conn = mongoose.connect('mongodb://localhost:27017/bettingSiteDB',{useNewUrlParser: true, useUnifiedTopology: true})
conn.then(()=>{
    console.log('Connected successfully to bettingSiteDB successfully')
})
.catch((err)=>{
    console.log('Connection failed with error: ', err.message) 
}) 