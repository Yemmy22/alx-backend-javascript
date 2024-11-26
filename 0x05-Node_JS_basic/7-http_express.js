const express = require('express');
const fs = require('fs');
const readline = require('readline');

const app = express();

// Function to count students and their fields from the database CSV
function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    const students = {};
    const fields = {};
    let length = 0;

    // Open the file
    const fileStream = fs.createReadStream(fileName);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });

    rl.on('line', (line) => {
      if (line) {
        length += 1;
        const field = line.split(',');
        if (field.length > 3) {
          const studentName = field[0];
          const studentField = field[3];

          // Organize students by their field
          if (!students[studentField]) {
            students[studentField] = [];
          }
          students[studentField].push(studentName);

          // Count students by field
          if (fields[studentField]) {
            fields[studentField] += 1;
          } else {
            fields[studentField] = 1;
          }
        }
      }
    });

    rl.on('close', () => {
      const output = [];
      output.push(`Number of students: ${length - 1}`); // Subtract the header line
      for (const [key, value] of Object.entries(fields)) {
        output.push(`Number of students in ${key}: ${value}. List: ${students[key].join(', ')}`);
      }
      resolve(output.join('\n'));
    });

    rl.on('error', (err) => {
      reject(err);
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
    res.send(`This is the list of our students\n${output}`);
  }).catch((err) => {
    res.status(500).send(`Cannot load the database: ${err.message}`);
  });
});

// Start the server
app.listen(1245, () => {
});

module.exports = app;
