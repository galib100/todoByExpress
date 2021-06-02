const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const Donarroute = require('./api/routes/doner')

const PORT = process.env.PORT || 3000;

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}))
app.get('/home',(req,res)=>{
    res.send("hey galib, this is home page!!")
}) 
app.use('/donar',Donarroute)


mongoose.connect("mongodb://localhost:27017/ontoron")
const db = mongoose.connection
db.on('err',err=>{
    console.log(err);
})
db.once('open',()=>{
    console.log("database is connected successfully")
})


app.listen(PORT,()=>{
    console.log(`Server is running on Port :: ${PORT}`)
});