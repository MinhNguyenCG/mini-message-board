const express = require('express');
const app = express();
const indexRouter = require('./routes/index');

// Setup EJS as the view engine
app.set('view engine', 'ejs');

// Middleware for parsing JSON and urlencoded bodies
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static('public'));

// Register routes
app.use('/', indexRouter);


// Setup port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});