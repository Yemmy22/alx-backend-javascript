const http = require('http');

// Create the server
const app = http.createServer((req, res) => {
  // Set response header for plain text
  res.setHeader('Content-Type', 'text/plain');
  // Write response body
  res.end('Hello Holberton School!');
});

// Listen on port 1245
app.listen(1245);

// Export the app
module.exports = app;
