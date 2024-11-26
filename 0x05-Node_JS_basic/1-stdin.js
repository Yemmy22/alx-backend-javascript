// Display initial message.
console.log('Welcome to Holberton School, what is your name?');

// Listen to standard input.
process.stdin.on('data', (data) => {
  const name = data.toString().trim(); // Get user input and trim extra spaces
  console.log(`Your name is: ${name}`);
  process.exit(); // Exit the process after displaying the name
});

// Listen for process exit and display closing message.
process.on('exit', () => {
  console.log('This important software is now closing');
});
