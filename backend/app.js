const dotenv= require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const cors = require('cors');
const connectToDb= require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes')

connectToDb();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors()); // abhi k lie sara jagah se req accept krnege ,baad m change krenge isko
app.get('/',(req,res)=>{
    res.send("hello world") // just for checking the server
})
app.use(cookieParser()); 


app.use('/users',userRoutes); 
app.use('/captains',captainRoutes); 

app.use('/maps',mapsRoutes);  

app.use('/rides', rideRoutes)

module.exports= app;