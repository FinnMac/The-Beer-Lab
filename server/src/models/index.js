// /src/models.js

// v 1.0
// Finn McCarthy

// This file will create our database and tables if needed.

const {Sequelize, DataTypes, INTEGER, STRING } = require('sequelize');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Create a db variable
let db = {};

// Create a new sequlize object.
const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password,
  config.db.options
);

// Create a model for sequelize
const Brew = sequelize.define('Brew',
  {
    BREW_id: 
    {
     type: DataTypes.STRING,
      primaryKey: true
    },  
    name: {type: DataTypes.STRING},
    start: {type: DataTypes.STRING},
    end: {type: DataTypes.STRING},
    ingredients: {type: DataTypes.STRING},
    notes: {type: DataTypes.STRING},
    original: {type: DataTypes.INTEGER},
    final: {type: DataTypes.INTEGER}
  }
);

// Create a mode for our Users
const User = sequelize.define('User',
  {
    // Primary key
    U_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING},
    // Allow Null: false means that we must have a value for this field
    // unique: true, means we can only have the one email in the table.
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    // There must be a password.
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Role base authentication
    // False by default.
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }
);

User.prototype.signToken = function(payload){
  // sign token
  const token = jwt.sign(payload, config.authentication.jwtSecret, { expiresIn: '2w'});
  return token;
};

User.prototype.hashPwd = async function(password, salt){

  // use bcrypt to hash password and salt
  const hashedPassword = await bcrypt.hash(password,salt);
  return hashedPassword;
};
// Add to the db variable.
db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Set up exports.
module.exports = db;
module.exports.Op = Sequelize.Op;