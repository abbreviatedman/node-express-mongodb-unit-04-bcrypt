const mongoose = require("mongoose");

// Settings for each document within this collection
const pokemonSchema = new mongoose.Schema({
  pokedexNo: {
    type: Number,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    unique: true,
    required: true,
  },

  type: {
    type: String,
    required: true,
  },

  moves: [String],
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
