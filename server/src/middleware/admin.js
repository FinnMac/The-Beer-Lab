// /src/middleware/admin.js

// v 1.0
// Finn McCarthy

// This file contains Middleware to test for admin users
const jwt = require('jsonwebtoken');
const config = require('../config/config');

function admin(req,res,next){
        //check if the user is an admin
        console.log("isAdmin ? " +req.user.isAdmin);
    if(req.user.isAdmin = false){
        // 403 = Forbidden - insufficient privileges
        return res.status(403).send('Access denied');
    }
    
    next();
};

module.exports = admin;