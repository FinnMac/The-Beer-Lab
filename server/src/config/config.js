// src/config/config.js

// v 1.0
// Finn McCarthy
// This file holds all of our config for our server

require('dotenv').config({path: `${__dirname}../../../secret.env`});

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    database: process.env.REACT_APP_DB_NAME,
    user: process.env.REACT_APP_DB_USER,
    password: process.env.REACT_APP_DB_PASS,
    options: {
      dialect: process.env.DIALECT || 'sqlite',
      host: process.env.HOST || 'locahost',
      // This will store to a file
      storage: './service_manager.sqlite'
    }
  },
  authentication: {
    raptSecret: process.env.REACT_APP_RAPT_KEY,
    sendgridSecret: process.env.REACT_APP_SENDGRID_KEY,
    jwtSecret: process.env.REACT_APP_JWT
  }
}