// const generateUnique4DigitNumber = (name) => {
//   // Generate a random 4-digit number
//   let number = Math.floor(1000 + Math.random() * 9000).toString();

//   // Check if the generated number is unique
//   const uniqueNumbers = new Set(); // Set to store unique numbers
//   while (uniqueNumbers.has(number)) {
//     // If the number is not unique, generate a new one
//     number = Math.floor(1000 + Math.random() * 9000).toString();
//   }

//   // Add the generated number to the set of unique numbers
//   uniqueNumbers.add(number);

//   return name + "-" + number;
// };

// const uniqueNumber = generateUnique4DigitNumber("Kaleem");

console.log(new Date().toLocaleDateString())
console.log(new Date().toLocaleTimeString())