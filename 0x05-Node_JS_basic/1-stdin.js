// Display initial message.
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Listen to standard input.
process.stdin.on('data', (data) => {
  process.stdout.write(`Your name is: ${data.toString()}`);
  process.exit();
});

// Listen for process exit and display closing message.
process.on('exit', () => {
  process.stdout.write('This important software is now closing\n');
});
