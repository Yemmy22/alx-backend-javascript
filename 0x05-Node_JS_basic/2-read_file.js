const fs = require('fs');

function countStudents(path) {
  try {
    // Read the file synchronously
    const data = fs.readFileSync(path, 'utf8');

    // Split file content into lines and filter out empty lines
    const lines = data.split('\n').filter((line) => line.trim() !== '');

    if (lines.length <= 1) {
      throw new Error('No valid data found in the file');
    }

    // Log total number of students
    const totalStudents = lines.length - 1; // Exclude header row
    process.stdout.write(`Number of students: ${totalStudents}\n`);

    // Process data into fields and names
    const fieldMap = {};
    for (let i = 1; i < lines.length; i += 1) {
      const [firstname, , , field] = lines[i].split(',');
      if (!fieldMap[field]) {
        fieldMap[field] = [];
      }
      fieldMap[field].push(firstname);
    }

    // Output field-specific counts and names
    for (const [field, names] of Object.entries(fieldMap)) {
      process.stdout.write(
        `Number of students in ${field}: ${names.length}. List: ${names.join(', ')}\n`,
      );
    }
  } catch (error) {
    // Use process.stderr for error messages
    process.stderr.write('Cannot load the database\n');
    // Explicitly exit the process with a failure code
    process.exit(1);
  }
}

module.exports = countStudents;
