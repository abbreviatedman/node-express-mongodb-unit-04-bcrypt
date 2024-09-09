/*
    1. Import bcrypt
*/
const bcrypt = require("bcrypt");

/*
    2. Write a generateSalt function
*/
async function generateSalt() {
  let salt = await bcrypt.genSalt(10);

  console.log(`salt alone: ${salt}`);
}

// generateSalt();

/*
    3. Write a hashAndSalt function
*/
async function hashAndSalt(password) {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(password, salt);

  console.log(`hashedPassword: ${hashedPassword}`);
}

// hashAndSalt("fakePass");

/*
    4. Write a comparePassword function
*/
async function comparePassword(incomingPassword, savedPassword) {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(savedPassword, salt);

  console.log(`incomingPassword: ${incomingPassword}`);
  console.log(`savedPassword: ${savedPassword}`);
  console.log(`hashedPassword from database: ${hashedPassword}`);

  let comparedPassword = await bcrypt.compare(incomingPassword, hashedPassword);

  if (!comparedPassword) {
    console.log("Please check your password and try again");
  } else {
    console.log("Logged in, Welcome!!");
  }
}

comparePassword("fakePass123", "fakePass123");
// comparePassword("fakePass123", "notTheSamePass");
