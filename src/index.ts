import path from 'node:path'; // Using 'node:' prefix for clarity

const message: string = 'Hello, TypeScript with Node.js!';
console.log(message);

// Example using a Node.js module
console.log(`Current directory using path module: ${path.resolve(__dirname)}`);
