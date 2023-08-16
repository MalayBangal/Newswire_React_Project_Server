const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();

mongoose.connect(process.env.DB_URI)
.then(()=>{
    console.log('db Connected');
})
.catch((error)=>{
    console.log(error);
});

app.use(express.json());
app.use(cors());

const newsRoute = require('./routes/news');
app.use(newsRoute);


app.get('/',(req,res)=>{
    res.send('working');
});
app.get('*',(req,res)=>{
    res.send('404 NotFound');
});

app.listen(process.env.PORT,()=>{
    console.log('server running ');
})