// /src/middleware/admin.js

// v 1.0
// Finn McCarthy

// This file contains Middleware to test for authenticated users

const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next){
    // Get token from header
    const token = req.header('x-auth-token');

    //if token is valid
    if(!token){
        return res.status(401).json({msg:'No token supplied, authorisation denied'});
    };

    //verifyy the token
    try {
        const decoded = jwt.verify(token,config.authentication.jwtSecret);
        req.user = decoded.user;
        next();
    } catch (error) {
        res.status(401).json(({msg: 'token is not valid'}));
    }
}