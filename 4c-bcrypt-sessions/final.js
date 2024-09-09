/*
    0. Starter Code - Modules
*/
const express = require("express");
const app = express();
const logger = require("morgan");
const path = require("path");
const methodOverride = require("method-override");
const connectToMongoDB = require("./database/mongoDB");
require("dotenv").config();

/*
    1. Import the session handling modules
*/
const cookieParser = require("cookie-parser");
const sessions = require("express-session");

// Router files
const indexRouter = require("./routes/indexRouter");

/*
    0. Starter Code - Middleware
*/
//  View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// See incoming requests in the console
app.use(logger("dev"));
// Corrects incoming request methods
app.use(methodOverride("_method"));
// Parsing incoming request data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
    2. Use cookie parser middleware
*/
app.use(cookieParser());

/*
    3. Set up the login session
*/
// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(
  sessions({
    secret: process.env.COOKIE_SECRET,
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false,
  })
);

// URL Routes
app.use("/", indexRouter);

/*
    0. Starter Code - Connections
*/
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}...`);

  connectToMongoDB();
});
