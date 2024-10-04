// Gives access to the collection in our database
const Pokemon = require("../../models/pokemonModel");
/*
    11. A) Import the User collection
*/

// Return a web page to the client with the entire collection
async function renderAllPokemon(req, res) {
  try {
    const result = await Pokemon.find({});

    // Populates a web page with our entire collection data
    res.render("pokemons", { pokemons: result });
  } catch (error) {
    console.log(`renderAllPokemon error: ${error}`);
  }
}

// Return a web page to the client with ONE document in the collection
async function renderOnePokemon(req, res) {
  try {
    const result = await Pokemon.findOne({ name: req.params.name });

    /*
            21. Modify renderOnePokemon() to show the page based on the login session
        */

    // Use pokemons.ejs file, all data will be in pokemon
    res.render("one-pokemon", { pokemon: result });
  } catch (error) {
    console.log(`renderOnePokemon error: ${error}`);
  }
}

// Return a web page where clients can post a new document in the collection
async function renderCreatePokemonForm(req, res) {
  try {
    res.render("create-pokemon");
  } catch (error) {
    console.log(`renderCreatePokemonForm error: ${error}`);
  }
}

// Return a web page where clients can update a document in the collection
async function renderUpdatePokemonForm(req, res) {
  try {
    // Target the correct document to be updated
    const result = await Pokemon.findOne({ name: req.params.name });

    // Render the update form with the filled-in original info
    res.render("update-pokemon", { pokemon: result });
  } catch (error) {
    console.log(`renderUpdatePokemonForm error: ${error}`);
  }
}

/*
    6. Set up Sign up and Log in functions
*/

/*
    11. B) Set up front-end function to render user page
*/

/*
    16. Set up front-end function to log the user out
*/

module.exports = {
  renderAllPokemon,
  renderOnePokemon,
  renderCreatePokemonForm,
  renderUpdatePokemonForm,
};
