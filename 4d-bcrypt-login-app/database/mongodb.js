// Mongoose is the module that allows us to work with MongoDB
const mongoose = require("mongoose");
// This brings in environment variables. In this case, our connection string to MongoDB
require("dotenv").config();
mongoose.set("strictQuery", false);

// This keeps the connection to the database open. It's always running, continuously
function connectToMongoDB() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("MongoDB Connected");
    })
    .catch((error) => {
      console.log(`DB connection failed: ${error}`);
    });
}

module.exports = connectToMongoDB;
