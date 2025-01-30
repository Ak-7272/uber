 const userModel=require('../models/user.model')
 const userService=require('../services/user.service')
 const {validationResult} = require('express-validator')

 module.exports.registerUser = async (req, res, next)=>{
    const errors= validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const { fullname, email, password } = req.body;
    const hashedPassword = await userModel.hashPassword(password)


    const user = userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashedPassword

    });

    const token = user.generateAuthToken()
    res.status(201).json({token, user});





 }
// module.exports.registerUser = async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     const { fullname, email, password } = req.body;

//     // ✅ Create a new User instance
//     const user = new userModel({
//         fullname: {
//             firstname: fullname.firstname,
//             lastname: fullname.lastname
//         },
//         email,
//         password
//     });

//     // ✅ Hash password before saving
//     await user.hashPassword();

//     // ✅ Save user in database
//     await user.save();

//     // ✅ Generate JWT token
//     const token = user.generateAuthToken();

//     res.status(201).json({ token, user });
// };

 