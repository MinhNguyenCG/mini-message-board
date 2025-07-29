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
    try {
        res.render('index', {
            title: 'Mini Message Board', 
            messages: messages || []
        });
    } catch (error) {
        console.error('Error rendering index:', error);
        res.status(500).render('404', { error: 'Failed to load messages' });
    }
});

// GET route for the new message page
router.get('/new', (req, res) => {
    try {
        res.render('form');
    } catch (error) {
        console.error('Error rendering form:', error);
        res.status(500).render('404', { error: 'Failed to load form' });
    }
});

// POST route for form submission
router.post('/new', (req, res) => {
    try {
        const { user, text } = req.body || {};
        
        // Validate input
        if (!user || !text || user.trim() === '' || text.trim() === '') {
            return res.status(400).render('form', { error: 'Please fill in all fields' });
        }
        
        // Add new message to the array
        messages.push({
            text: text.trim(),
            user: user.trim(),
            added: new Date()
        });
        
        res.redirect('/');
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).render('form', { error: 'Failed to add message' });
    }
});

module.exports = router;
