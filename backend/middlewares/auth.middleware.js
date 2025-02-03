const UserModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    
    if(!token){
        return res.status(401).json({ message: 'Token not provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded._id);

        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
}

