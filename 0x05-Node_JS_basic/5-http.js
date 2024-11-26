const http = require('http');
const fs = require('fs');

// Function to count students, similar to 3-read_file_async.js
function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, content) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = content.toString().split('\n');
      for (let i = 0; i < lines.length; i += 1) {
        if (lines[i]) {
          length += 1;
          const field = lines[i].toString().split(',');
          const studentName = field[0];
          const studentField = field[3];

          if (students[studentField]) {
            students[studentField].push(studentName);
          } else {
            students[studentField] = [studentName];
          }

          if (fields[studentField]) {
            fields[studentField] += 1;
          } else {
            fields[studentField] = 1;
          }
        }
      }

      const totalStudents = length - 1; // excluding the header
      let output = `Number of students: ${totalStudents}\n`;

      for (const [field, count] of Object.entries(fields)) {
        if (field !== 'field') {
          output += `Number of students in ${field}: ${count}. List: ${students[field].join(', ')}\n`;
        }
      }
      resolve(output.slice(0, -1)); // Remove the last newline
    });
  });
}

// Create HTTP server
const app = http.createServer((req, res) => {
  const { url } = req;
  const { method } = req;

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  if (method === 'GET') {
    if (url === '/') {
      res.write('Hello Holberton School!');
      res.end();
    } else if (url === '/students') {
      const fileName = process.argv[2]; // Get the filename from the command-line arguments
      countStudents(fileName)
        .then((output) => {
          res.write('This is the list of our students\n');
          res.end(output); // end with the formatted output without extra newline
        })
        .catch(() => {
          res.statusCode = 404;
          res.end('Cannot load the database');
        });
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  } else {
    res.statusCode = 405;
    res.end('Method Not Allowed');
  }
});

// Listen on port 1245
app.listen(1245, '127.0.0.1', () => {
});

module.exports = app;
