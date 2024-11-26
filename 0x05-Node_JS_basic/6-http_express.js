const express = require('express');
// Import the express module
const app = express(); // Create an instance of an express app

// Define the root endpoint '/'
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Export the app for use in other modules
module.exports = app;

// Make the server listen on port 1245
app.listen(1245, () => {
});
