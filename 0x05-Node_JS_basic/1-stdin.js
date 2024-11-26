// Display initial message.
process.stdout.write('Welcome to Holberton School, what is your name?\n');

if (process.stdin.isTTY) {
  // Listen to standard input.
  process.stdin.on('data', (data) => {
    // Get user input and trim extra spaces
    process.stdout.write(`Your name is: ${data.toString()}`);
    // Exit the process after displaying the name
    process.exit();
  });
} else {
  process.stdin.on('data', (data) => {
    process.stdout.write(`Your name is: ${data.toString()}`);
    process.exit();
  });
  // Listen for process exit and display closing message.
  process.on('exit', () => {
    process.stdout.write('This important software is now closing\n');
  });
}
