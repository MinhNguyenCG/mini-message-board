const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

// Setup EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing JSON and urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Health check endpoint for Vercel
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Register routes
app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('404', { error: 'Something went wrong!' });
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
    res.status(404).render('404');
});

// Setup port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Export for Vercel serverless deployment
module.exports = app;