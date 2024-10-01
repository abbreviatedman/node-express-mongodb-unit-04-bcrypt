/*
    1. Import bcrypt
*/
const bcrypt = require("bcrypt");

/*
    2. Write a generateSalt function
*/
// async function generateSalt() {
//   let salt = await bcrypt.genSalt(10);

//   console.log(`salt alone: ${salt}`);
// }

// generateSalt();

/*
    3. Write a hashAndSalt function
*/
// async function hashAndSalt(password) {
//   let salt = await bcrypt.genSalt(10);
//   let hashedPassword = await bcrypt.hash(password, salt);

//   console.log(`hashedPassword: ${hashedPassword}`);
// }

// hashAndSalt("fakePass");

/*
    4. Write a comparePassword function
*/

// let storedPassword = "fakePass123";

// async function comparePassword(incomingPassword) {
//   // This hashing and storing of the password would happen when the user signs up.
//   const salt = await bcrypt.genSalt(10);
//   const hashedPassword = await bcrypt.hash(storedPassword, salt);

//   // Very different passwords, but bcrypt can compare them!
//   console.log(`incomingPassword: ${incomingPassword}`);
//   console.log(`storedPassword: ${hashedPassword}`);

//   let isSamePassword = await bcrypt.compare(incomingPassword, hashedPassword);
//   if (isSamePassword) {
//     console.log("Logged in, Welcome!!");
//   } else {
//     console.log("Please check your password and try again");
//   }
// }

// comparePassword("fakePass123");
// comparePassword("notTheSamePass");

const measureCostFactorTime = async function() {
  const plainTextPassword1 = "bad-password";
  for (let costFactor = 10; costFactor <= 17; costFactor++) {
    console.time(`bcrypt | cost: ${costFactor}, time to hash`);
    const salt = await bcrypt.genSalt(costFactor);
    await bcrypt.hash(plainTextPassword1, salt)
    console.timeEnd(`bcrypt | cost: ${costFactor}, time to hash`);
  }
}

measureCostFactorTime();
