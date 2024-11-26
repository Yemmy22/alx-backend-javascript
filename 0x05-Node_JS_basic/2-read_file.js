/* eslint-disable no-unused-vars */
const fs = require('fs');

function countStudents(fileName) {
  try {
    // Read and process file content
    const content = fs.readFileSync(fileName, 'utf-8');
    const lines = content.trim().split('\n');

    // Handle empty file case
    if (lines.length <= 1) throw new Error('Cannot load the database');

    // Extract headers and data rows
    const header = lines[0].split(',');
    const students = lines.slice(1).map((line) => line.split(','));

    // Aggregate student data by field
    const fieldStats = {};
    students.forEach((student) => {
      const [firstname, , , field] = student;
      if (!fieldStats[field]) {
        fieldStats[field] = [];
      }
      fieldStats[field].push(firstname);
    });

    // Log total students and details by field
    console.log(`Number of students: ${students.length}`);
    Object.entries(fieldStats).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
