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
    try {
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            environment: process.env.NODE_ENV || 'development'
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({ status: 'ERROR', message: 'Health check failed' });
    }
});

// Debug endpoint
app.get('/api/debug', (req, res) => {
    try {
        res.json({
            message: 'Debug endpoint working',
            nodeVersion: process.version,
            environment: process.env.NODE_ENV,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Debug error:', error);
        res.status(500).json({ error: 'Debug endpoint failed' });
    }
});

// Register routes
app.use('/', indexRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Error:', err.stack);
    try {
        res.status(500).render('404', { error: 'Something went wrong!' });
    } catch (renderError) {
        console.error('Render error:', renderError);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 404 handler for unmatched routes
app.use('*', (req, res) => {
    try {
        res.status(404).render('404');
    } catch (renderError) {
        console.error('404 render error:', renderError);
        res.status(404).json({ error: 'Page not found' });
    }
});

// Export for Vercel serverless deployment
module.exports = app;