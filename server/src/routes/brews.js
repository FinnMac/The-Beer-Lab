// /src/routes/brews.js

// v 1.0
// Finn McCarthy

// This file contains the API routes in relation to brews

const express = require('express');
const fileUpload = require('express-fileupload');
const { body, validationResult } = require('express-validator');

const db = require('../models/index');

const router = express.Router();
const { Brew } = db.sequelize.models;

const admin = require('../middleware/admin');
const auth = require('../middleware/auth');
const uuidv1 = require('uuidv1')
router.use(fileUpload());

router.post('/brew/add', [auth, admin], async (req, res) => {
  const { BREW_id, name, start, end, ingredients, notes, original, final} = req.body;

  const brew = await Brew.create({
    BREW_id,
    name,
    start,
    end,
    ingredients,
    notes,
    original,
    final
  });
  
  res.send(brew);
    }),

router.get('/brews', async (req, res) => {
  const list = await Brew.findAll();
  res.send(list);
});

router.get('/brews/titleASC', async (req, res) => {
  const list = await Brew.findAll({ order: [['name', 'ASC']] });
  res.send(list);
});

router.get('/brews/3newest', async (req, res) => {
  const list = await Brew.findAll({ order: [['createdAt', 'DESC']],limit: 3});
  res.send(list);
});

router.get('/brew/:id', async (req, res) => {
  let id = req.params.id;
  const brew = await Brew.findByPk(id);
  res.send(brew);
});

router.put('/brew/edit/:id', [auth, admin], async (req, res) => {
  const {name, start, end, ingredients, notes, original, final } = req.body;

    const id = req.params.id;
    const brew = await Brew.update({
      name,
      start,
      end,
      ingredients,
      notes,
      original,
      final
    }, {
      where: { BREW_id: id }
    });

    res.send(brew);
});

router.delete('/brew/:id', [auth, admin], (req, res) => {

  var id = req.params.id;
  Brew.destroy({
    where: {
      BREW_id: id
    }
  });
  res.send(`Service with ID "${id}" deleted`);
});

module.exports = router;