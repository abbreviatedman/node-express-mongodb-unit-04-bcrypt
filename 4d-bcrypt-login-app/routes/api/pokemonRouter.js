// Set up Router functionality
const express = require("express");
const router = express.Router();

// Imports database communications
const {
  getAllPokemon,
  getOnePokemon,
  createOnePokemon,
  deleteOnePokemon,
  updateOnePokemon,
} = require("../../controllers/api/pokemonController");

// localhost:3000/api/allPokemon
router.get("/allPokemon", getAllPokemon);
// localhost:3000/api/onePokemon/:name
router.get("/onePokemon/:name", getOnePokemon);

// localhost:3000/api/createOnePokemon
router.post("/createOnePokemon", createOnePokemon);

// localhost:3000/api/updateOnePokemon/:name
router.put("/updateOnePokemon/:name", updateOnePokemon);

// localhost:3000/api/deleteOnePokemon/:name
router.delete("/deleteOnePokemon/:name", deleteOnePokemon);

module.exports = router;
