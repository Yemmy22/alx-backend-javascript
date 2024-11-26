const fs = require('fs');

function countStudents(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf-8', (err, data) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      try {
        // Split file contents into lines and ignore the header
        const lines = data.trim().split('\n');
        const students = lines.slice(1).map((line) => line.split(','));

        // Aggregate data by fields
        const fieldStats = {};
        students.forEach((student) => {
          if (student.length < 4) return; // Skip invalid lines
          const [firstname, , , field] = student;
          if (!fieldStats[field]) {
            fieldStats[field] = [];
          }
          fieldStats[field].push(firstname);
        });

        // Log overall stats
        console.log(`Number of students: ${students.length}`);
        Object.entries(fieldStats).forEach(([field, names]) => {
          console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
        });

        resolve();
      } catch (parseError) {
        reject(new Error('Cannot load the database'));
      }
    });
  });
}

module.exports = countStudents;
