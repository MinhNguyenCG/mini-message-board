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

// GET "/" to show all message
router.get('/', (req, res) => {
    res.render('index', {title: 'Mini Message Board', messages: messages});
});

// GET route for the new message page
router.get('/new', (req, res) => {
    res.render('form');
});

// POST route for form submission
router.post('/new', (req, res) => {
    const { user, text } = req.body;
    
    // Add new message to the array
    messages.push({
        text: text,
        user: user,
        added: new Date()
    });
    
    res.redirect('/');
});

// 404 handler - must be at the end
router.use('*splat', (req, res) => {
    res.status(404).render('404');
});

module.exports = router;
