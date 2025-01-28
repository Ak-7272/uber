const dotenv= require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb= require('./db/db');

connectToDb();

app.use(cors()); // abhi k lie sara jagah se req accept krnege ,baad m change krenge isko
app.get('/',(req,res)=>{
    res.send("hello world") // just for checking the server
})

module.exports= app;