// Import express, set up router
const express = require("express");
const router = express.Router();

// Import functionality from the view controller
const {
  renderAllPokemon,
  renderOnePokemon,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
} = require("../../controllers/view/viewController");

router.get("/", (req, res) => {
  res.render("index");
});

// localhost:3000/pokemons
router.get("/pokemons", renderAllPokemon);
// localhost:3000/one-pokemon/:name
router.get("/one-pokemon/:name", renderOnePokemon);
// localhost:3000/createpokemons
router.get("/create-pokemon", renderCreatePokemonForm);
// localhost:3000/update-pokemon/:name
router.get("/update-pokemon/:name", renderUpdatePokemonForm);

/*
    7. Set up sign-up and log-in form routes
*/

/*
    12. Set up front-end route for the user page
*/

/*
    17. Set up log out route to end sessions
*/

module.exports = router;
