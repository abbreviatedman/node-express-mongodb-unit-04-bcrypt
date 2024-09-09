/*
    0. Starter Code - Modules
*/
const express = require("express");
const router = express.Router();

/*
    0. Starter Code - Homepage
*/
router.get("/", (req, res) => {
  res.render("home", { user: null });
  /*
        4. Render a page based on login credentials
    */
});

/*
    0. Starter Code - Login
*/
router.get("/log-in", (req, res) => {
  res.render("login", { user: null });
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

/*
    6. Set up Log In route
*/

/*
    7. Set up the log out route
*/

/*
    0. Starter Code - Router export
*/
module.exports = router;
