// /src/server.js

// v 1.0
// Finn McCarthy

// This file contains and compacts the routes for the application's API calls to external services

const express = require('express');
const db = require('./models');
const config = require('./config/config');

const users = require('./routes/user');
const brews = require('./routes/brews');
const api = require('./routes/api');
const auth = require('./routes/auth');

const app = express();


// Allow the server to parse incomming requests with JSON
app.use(express.json()); 
// Allow the server ro parse incomming request with url-encoded data
// Use routes
app.use(express.static('C:/Users/finnh/Documents/Changing/Bobs_Garage/client/build'))

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/s', brews);
app.use('/api/api', api);

// Create a test route
app.get('/home', (req, res) => {
  // testing purposes
  console.log('/ - get');
  res.send('Home Page');
});

app.use('/*', (req, res) => {
  // testing purposes
  console.log('/ - get');
  res.sendFile('C:/Users/finnh/Documents/Changing/Bobs_Garage/client/build/index.html');
});

db.sequelize.sync().then(() => {
  app.listen(config.port,
    console.log(`Server is running on port: ${config.port}`)
  );
});
