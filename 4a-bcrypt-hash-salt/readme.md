# 4A. Bcrypt Hash & Salt

---

## What this lesson covers:

- What is Bcrypt
- Concept: How encryption works
- Hashing
- Salting
- Rainbow Table
- Getting Started

---

## Bcrypt

Bcrypt is a password hashing function that is used to secure passwords in Node.

## Hashing

Hashing a password is a way of securely storing a password in a database so that it cannot be easily accessed by unauthorized users. When a user creates an account and sets a password, the password is passed through a hash function, which converts it into a fixed-size string of characters, called a hash. The original password cannot be easily reconstructed from the hash, making it more secure.

The hash function used should be a cryptographic hash function, which is a special kind of function that is designed to be difficult to reverse. This means that it is very difficult, if not impossible, to determine the original password from the hash.

Hashing passwords is important because it helps to protect the security and privacy of users. If a database of hashed passwords is ever compromised, the attackers will not be able to easily access the original passwords. This is why it is important for websites and other online services to store passwords using a secure hashing function.

Using Bcrypt on the password `myPassword123` would produce something like the following:

`myPassword123` -> `$2y$12$vUw4OU4EAl4w4vC6/lA33OtDSYGhiIdekdT9iOoSs9/ckwrffaEui`

That output can be used to compare against future hashes to see if the original data matches.

### Bcrypt Output Format

`$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy`

- `2a`: The hash algorithm identifier (Bcrypt)
- `10`: Cost factor (210 = 1,024 rounds of key expansion)
- `N9qo8uLOickgx2ZMRZoMye`: 16-byte (128-bit) salt, base64 encoded to 22 characters
- `IjZAgcfl7p92ldGxad68LJZdL17lhWy`: 24-byte (192-bit) hash, base64 encoded to 31 characters

## Salting

Salting is a technique that is often used in conjunction with hashing to further improve the security of the password storage. When a password is hashed and salted, a random string of characters, called a salt, is generated and added to the password before it is hashed. The salt is then stored along with the hash in the database.

The main difference between hashing and salting is that hashing is a one-way process, while salting involves adding a random element to the data before it is hashed. Salting helps to make the hashing process more secure by adding an additional layer of protection.

One of the main benefits of salting is that it makes it much more difficult for an attacker to use a pre-computed dictionary, or rainbow table, to crack a large number of hashes. Without a salt, an attacker can use a rainbow table to quickly look up the original password for a given hash. However, with a salt, the attacker would need to create a new rainbow table for each salt value, which is much more time-consuming and difficult.

If a password is weak (meaning it has less character variation, or has less characters overall), it means that the method of hashing the password becomes more easily revealed to someone who wishes to unlock all the passwords available. If a password is strong (meaning more characters, variation, etc.), it becomes more difficult to determine the method of hashing.

## Rainbow Table

A rainbow table is a pre-computed table of hashes that can be used to crack passwords. The idea behind a rainbow table is to create a large table of hashes in advance, and then use the table to look up the original password for a given hash.

Here is an example of a small rainbow table with just a few entries:

| Hash     | Password |
| -------- | -------- |
| abcd1234 | password |
| efgh5678 | qwerty   |
| ijkl9101 | abc123   |
| mnop1122 | letmein  |

In this example, the first column is the hash of the password, and the second column is the original password. An attacker can use this rainbow table to quickly look up the original password for a given hash.

However, rainbow tables are only effective if the hashes in the table were created using the same hashing function and without a salt. If a salt was used, then the attacker would need to create a new rainbow table for each unique salt value, which is much more time-consuming and difficult. This is why salting is an important technique for improving the security of password storage.

## Getting Started

- Navigate to this root folder via the Terminal
- Use command `npm init -y` to initialize the project
- Use command `npm install bcrypt` to install the only module we need for this lesson.

1. Import bcrypt
<!-- 1. Import bcrypt -->

```js
const bcrypt = require("bcrypt");
```

Next, we're going to test how salting works.

2. Write a generateSalt function
<!-- 2. Write a generateSalt function -->

```js
async function generateSalt() {
  let salt = await bcrypt.genSalt(10);

  console.log(`salt alone: ${salt}`);
}

generateSalt();
```

- Run it using command `node index.js`
- Notice that the salt is unique EVERY time you generate a salt

Next, we're going to combine hash and salt.

3. Write a hashAndSalt function
<!-- 3. Write a hashAndSalt function -->

```js
async function hashAndSalt(password) {
  let salt = await bcrypt.genSalt(10);

  let hashedPassword = await bcrypt.hash(password, salt);

  console.log(`hashed password: ${hashedPassword}`);
}

hashAndSalt("fakePass");
```

- Run it using `node index.js`
- Notice that the hash & salt value is MUCH LARGER than the salt alone

Finally, it's time to see how bcrypt compares passwords.

4. Write a comparePassword function
<!-- 4. Write a comparePassword function -->

```js
async function comparePassword(incomingPassword, savedPassword) {
  let salt = await bcrypt.genSalt(10);
  let hashedPassword = await bcrypt.hash(savedPassword, salt);

  console.log(`incomingPassword: ${incomingPassword}`);
  console.log(`savedPassword: ${savedPassword}`);
  console.log(`hashedPassword from database: ${hashedPassword}`);

  // This is so we can see what BCrypt is doing to compare the 2
  let hashedPassword2 = await bcrypt.hash(incomingPassword, salt);

  console.log(`attempted password, encrypted: ${hashedPassword2}`);

  let comparedPassword = await bcrypt.compare(incomingPassword, hashedPassword);

  if (!comparedPassword) {
    console.log("Please check your password and try again");
  } else {
    console.log("Logged in, Welcome!!");
  }
}

comparePassword("fakePass123", "fakePass123");
// comparePassword("fakePass123", "notTheSamePass");
```

Notice that bcrypt simply compares the passwords for you. When creating a user, the hashed version of the password is what gets saved to the database. This way, anybody who has access to the database can't learn your password and try it out on different websites. Bcrypt has it's ways of security and managing client's abilities to log in.

## Extended Lesson

Start a Database and begin storing usernames and passwords.
