const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const userSchema = new mongoose.Schema({

    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'First Name must be of at least 3 characters'],

        },
        lastname:{
            type:String,
            minlength:[3,'Last Name must be of at least 3 characters'],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,'Please enter a valid email'],
    },
    password:{
        type:String,
        required:true,
        //explain select : false
        select:false // means jb user ko find krenge to ye password field nhi jaega 
    },
    socketId:{ // for driver ka live location share krne k lie with user 
        type:String,
        
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
    return token;
};

    userSchema.methods.comparePassword= async function(password){
        return await bcrypt.compare(password, this.password);
    }

    userSchema.statics.hashPassword = async function(password) {
        return await bcrypt.hash(password, 10);
    };
    
    const userModel = mongoose.model('user', userSchema);


module.exports = userModel;


// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

// const userSchema = new mongoose.Schema({
//     fullname: {
//         firstname: {
//             type: String,
//             required: true,
//             minlength: [3, 'First Name must be at least 3 characters'],
//         },
//         lastname: {
//             type: String,
//             minlength: [3, 'Last Name must be at least 3 characters'],
//         }
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email'],
//     },
//     password: {
//         type: String,
//         required: true,
//         select: false // Prevents password from being returned in queries
//     },
//     socketId: { // For real-time location sharing
//         type: String,
//     }
// });

// // Generate authentication token
// const generateAuthToken = function(user) {
//     return jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });
// };

// // Compare provided password with hashed password
// const comparePassword = async function(password, hashedPassword) {
//     return await bcrypt.compare(password, hashedPassword);
// };

// // Hash password before storing it
// const hashPassword = async function(password) {
//     return await bcrypt.hash(password, 10);
// };

// const UserModel = mongoose.model('User', userSchema);

// module.exports = {
//     UserModel,
//     generateAuthToken,
//     comparePassword,
//     hashPassword
// };

