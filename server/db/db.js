const mongoose = require('mongoose') 
mongoose.set('useCreateIndex', true)
const db = process.env.NODE_ENV === 'production'?process.env.MONGODB_CONN_STR_PROD:process.env.MONGODB_CONN_STR_LOCAL
const conn = mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
conn.then(()=>{
    console.log('Connected successfully to bettingSiteDB successfully')
})
.catch((err)=>{
    console.log('Connection failed with error: ', err.message) 
}) 