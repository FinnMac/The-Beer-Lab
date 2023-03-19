// /src/routes/auth.js

// v 1.0
// Finn McCarthy

// This file holds the routes for auth

const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../models');

// require needed middleware
const auth = require('../middleware/auth');

const router = express.Router();
const { User } = db.sequelize.models;

// Get the user 
// used by loaduser();
router.get('/', auth, async(req, res) => {
    console.log('/api/auth - get')
    try{
      const user = await User.findByPk(req.user.u_id);
      res.json(user);
      console.log(user)
    }catch(error){
      console.log(error.message);
      res.status(500).send('Server error');
    }
  });

// Auth route
// logging in
router.post('/', async(req, res) => {
    // Login route
    console.log('/api/auth - post');
    // Get the info from the client
    const { email, password } = req.body;
  
    try {
      // Check to see if the user is in the Users Table.
      let user = await User.findOne({ where: { email: email } });
      // If the user is not in the table, send a message back to the client.
      if (!user){
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
      };
      // Check to see if the enter password is the same as the stored password (the password in the database)
      // To do this we is the function bcrypt.compare
      const isMatch = await bcrypt.compare(password, user.password);
      // Is the match is false, we can send back a message
      if(!isMatch) {
        return res.status(400).json({ errors: [{ msg: 'Invalid Credentials'}] });
      };
      // Look at generating a token to send to the cleint
      // Use the jwt.sign(method)
      const payload = {
        user: {
          u_id: user.U_id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }
      };
      // Use the new db function to sign the token
      const token = User.prototype.signToken(payload);
      res.json({token});
    } catch (error) {
      // Send a message if the try block fails
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });
  
  module.exports = router;