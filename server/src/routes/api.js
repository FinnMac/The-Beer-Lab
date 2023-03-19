// /src/routes/auth.js

// v 1.0
// Finn McCarthy

// This file holds the routes for auth
const cors = require('cors');
const express = require('express');
const axios = require('axios');
const sendgrid = require('@sendgrid/mail');
const querystring = require('querystring');
// require needed middleware
const config = require('../config/config');

const router = express();
router.use(cors())

router.get('/', async (req, res) => {
  console.log('/api/api - get')

  try {
    const data = {
      'client_id': 'rapt-user',
      'grant_type': 'password',
      'username': 'finnhenrymac@gmail.com',
      'password': config.authentication.raptSecret
    };
    const POSToptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      data: querystring.stringify(data),
      url: 'https://id.rapt.io/connect/token',
    };

    axios(POSToptions).then((POSTresponse) => {

      const GEToptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + POSTresponse.data.access_token },
        url: 'https://api.rapt.io/api/Hydrometers/GetHydrometer?hydrometerId=033b8f2d-2f33-478a-bf1b-bcdbd13e514e',
      };
      axios(GEToptions).then((GETresponse) => {
       res.json(GETresponse.data);

      }).catch((error) => {
        return res.status(429).send('API calls quota exceeded! maximum admitted 5 per 1m.');
      });

    }).catch((error) => {
      console.error(error);
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server error');
  }
});

router.post('/email', async (req, res) => {
  try {
  sendgrid.setApiKey(config.authentication.sendgridSecret);
  sendgrid.send(req.body);
  }
  catch (error) {
    
  }
});

module.exports = router;