/*
    0. Starter Code - Modules
*/
const express = require("express");
const router = express.Router();

/*
    0. Starter Code - Homepage
*/
router.get("/", (req, res) => {
  // res.render("home", {user: undefined});
  console.log(req.session);
  /*
        4. Render a page based on login credentials
    */
  if (req.session.isAuth) {
    res.render("home", { user: req.session.user });
  } else {
    res.redirect("log-in");
  }
});

/*
    0. Starter Code - Login
*/
router.get("/log-in", (req, res) => {
  if (!req.session.isAuth) {
    res.render("login", { user: undefined });
  } else {
    res.redirect("/");
  }
});

/*
    0. Starter Code - Welcome
*/
router.get("/welcome", (req, res) => {
  res.render("welcome", { user: req.session.user });
});

/*
    5. Set temporary login credentials
*/
let userId = "hamsterOverlord";
let tempPass = "myPassword";

/*
    6. Set up Log In route
*/
router.post("/user", (req, res) => {
  // Check IF login credentials are correct
  if (req.body.username === userId && req.body.password === tempPass) {
    // If logged in, set auth to true on the server side session
    req.session.isAuth = true;

    // Add a user to the predefined session object
    req.session.user = req.body.username;

    // check the session object again
    console.log(req.session);

    // Send client to the welcome page
    res.redirect("welcome");
  } else {
    res.send("invalid username and/or password");
  }
});

/*
    7. Set up the log out route
*/
router.get("/logout", (req, res) => {
  // browser-side
  res.clearCookie("connect.sid", {
    path: "/",
    httpOnly: true,
    secure: false,
    maxAge: null,
  });

  // server-side
  req.session.destroy();

  res.redirect("/");
});

/*
    0. Starter Code - Router export
*/
module.exports = router;
