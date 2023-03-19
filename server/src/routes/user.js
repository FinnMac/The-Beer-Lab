// /src/routes/user.js

// v 1.0
// Finn McCarthy

// This file contains the API routes in relation to users

const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const router = express.Router();
const { User } = db.sequelize.models;

router.post("/new", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // check if the user is already registered
    let user = await User.findOne({ where: { email: email } });
    // If the user does exist, send a message to the client.
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    // create a new user object,
    const newUser = {
      name,
      email,
      password,
    };
    // Encrypt our password
    // We are going to use bcrypt to encrypt and sal our password
    const salt = await bcrypt.genSalt(10);
    // The number here, bigger = more secure and more time, smaller is faster but less secure.
    // 10 is the default.
    newUser.password = await bcrypt.hash(password, salt);
    console.log(newUser);

    // Save the user to the database.
    const userRes = await User.create({
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      isAdmin: false,
    });

    // res.send(userRes);
    // After registering a new user, send a token.
    const payload = {
      user: {
        u_id: userRes.U_id,
        name: userRes.name,
        email: userRes.email,
        isAdmin: userRes.isAdmin,
      },
    };
    // sign our token.
    // Use the new db function to sign the token
    const token = User.prototype.signToken(payload);
    res.json({ token });
  } catch (error) {
    // Send a message if the try block fails
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.get("/:id",async (req,res) =>{
    const list = await User.findByPk(req.user.u_id, {attributes:{exclude: ["password"]}});
    res.send(list);
});

module.exports = router;
