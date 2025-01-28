 const mongoose = require('mongoose');

function connectToDb(){
    mongoose.connect(process.env.DB_CONNECT
    ).then(() => {
        console.log("Connected to MongoDB");
    }).catch(err => console.log("Error connecting",err));
} 

module.exports= connectToDb;