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

// GET localhost:3000/api/pokemons
router.get("/", getAllPokemon);

// GET localhost:3000/api/pokemons/:name
router.get("/:name", getOnePokemon);

// POST localhost:3000/api/pokemons
router.post("/", createOnePokemon);

// PUT localhost:3000/api/pokemons/:name
router.put("/:name", updateOnePokemon);

// DELETE localhost:3000/api/pokemons/:name
router.delete("/:name", deleteOnePokemon);

module.exports = router;
