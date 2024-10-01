const express = require("express");
const app = express();
const logger = require("morgan");
const connectToMongoDb = require("./db/mongodb");

const userRouter = require("./routes/userRouter");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api/users", userRouter);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);

  connectToMongoDb();
});
