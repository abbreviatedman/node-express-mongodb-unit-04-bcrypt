// Mongoose is the module that allows us to work with MongoDB
const mongoose = require("mongoose");
// This brings in environment variables. In this case, our connection string to MongoDB
require("dotenv").config();

// This keeps the connection to the database open. It's always running, continuously
async function connectToMongoDb() {
  mongoose.set("strictQuery", false);
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(`DB connection failed: ${error}`);
  };
}

module.exports = connectToMongoDb;
