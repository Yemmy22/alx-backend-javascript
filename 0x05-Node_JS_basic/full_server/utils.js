/* eslint-disable no-unused-vars */
import fs from 'fs';

const readDatabase = (filePath) => new Promise((resolve, reject) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    try {
      // Parse CSV data
      const lines = data.trim().split('\n').slice(1); // Skip header
      const studentsByField = {};

      lines.forEach((line) => {
        const [firstname, lastname, age, field] = line.split(',');
        if (!studentsByField[field]) {
          studentsByField[field] = [];
        }
        studentsByField[field].push(firstname);
      });

      resolve(studentsByField);
    } catch (parseError) {
      reject(parseError);
    }
  });
});

export default readDatabase;
