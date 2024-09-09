const mongoose = require("mongoose");

// Settings for each document within this collection
const pokemonSchema = new mongoose.Schema({
  PokedexNo: {
    type: Number,
    unique: true,
    required: true,
  },
  Name: {
    type: String,
    unique: true,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  Moves: [
    {
      type: String,
    },
  ],
});

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
