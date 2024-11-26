const express = require('express');
const { readFile } = require('fs');

const app = express();
const port = 1245;

// Function to count students and their fields from the database CSV
function countStudents(fileName) {
  const students = {};
  const fields = {};
  let length = 0;

  return new Promise((resolve, reject) => {
    readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        let output = '';
        const lines = data.toString().split('\n');

        // Process each line in the file
        for (let i = 0; i < lines.length; i += 1) {
          if (lines[i]) { // Ignore empty lines
            length += 1;
            const field = lines[i].toString().split(',');

            // Organize students by their field
            if (Object.prototype.hasOwnProperty.call(students, field[3])) {
              students[field[3]].push(field[0]);
            } else {
              students[field[3]] = [field[0]];
            }

            // Count students by field
            if (Object.prototype.hasOwnProperty.call(fields, field[3])) {
              fields[field[3]] += 1;
            } else {
              fields[field[3]] = 1;
            }
          }
        }

        // Subtract 1 for the header line
        const l = length - 1;
        output += `Number of students: ${l}\n`;

        // Build the output for each field
        for (const [key, value] of Object.entries(fields)) {
          if (key !== 'field') { // Avoid 'field' if it's present
            output += `Number of students in ${key}: ${value}. `;
            output += `List: ${students[key].join(', ')}\n`;
          }
        }

        resolve(output);
      }
    });
  });
}

// Route for the root URL
app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

// Route for /students
app.get('/students', (req, res) => {
  const fileName = process.argv[2]; // Get database filename passed as argument

  if (!fileName) {
    res.status(400).send('Please provide a database file as an argument');
    return;
  }

  countStudents(fileName).then((output) => {
    res.send(['This is the list of our students', output].join('\n'));
  }).catch(() => {
    res.status(500).send('This is the list of our students\nCannot load the database');
  });
});

// Start the server silently without logging extra information
app.listen(port, () => {});

module.exports = app;
