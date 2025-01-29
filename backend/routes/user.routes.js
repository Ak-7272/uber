const express = require('express');
const router = express.router();

const {body}=require ('express-validator')
const userController = require('../controllers/user.controller')

router.post('/register',[
    body('fullname.firstname').notEmpty().withMessage('First Name is required'),
   
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password must be at least 6 characters long'),
    body('password').matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/, 'Your password must contain at least one number, one lowercase and one uppercase letter').withMessage('Password must contain at least one number, one lowercase and one uppercase letter'),

    userController.registerUser // it is passed as a user controller 
])




module.exports =router;