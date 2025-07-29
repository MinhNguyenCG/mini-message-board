const express = require('express');
const router = express.Router();

const messages = [
    {
      text: "Hi there!",
      user: "Amando",
      added: new Date()
    },
    {
      text: "Hello World!",
      user: "Charles",
      added: new Date()
    }
  ];

// GET route for the home page
router.get('/', (req, res) => {
    res.render('index');
});

// GET route for the new message page
router.get('/new', (req, res) => {
    res.render('new');
});

// POST route for form submission
router.post('/new', (req, res) => {
    // Handle form submission here
    res.redirect('/');
});

module.exports = router;
