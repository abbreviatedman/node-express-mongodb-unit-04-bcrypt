const Pokemon = require("../../models/pokemonModel");

const getAllPokemon = async function (req, res) {
  try {
    const result = await Pokemon.find({});

    res.json({
      message: "success",
      payload: result,
    });
  } catch (err) {
    console.log(`getAllPokemon error: ${err}`);

    res.json({
      message: "failure",
      payload: err,
    });
  }
}

const getOnePokemon = async function (req, res) {
  try {
    const result = await Pokemon.findOne({ name: req.params.name });

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    // server-side message
    console.log(`getOnePokemon error: ${error}`);

    // client-side message
    res.json({
      message: "failure",
      payload: error,
    });
  }
}

const createOnePokemon = async function (req, res) {
  try {
    // Accept the front-end form data from the client, generates the document
    const newPokemon = {
      pokedexNo: req.body.pokedexNo,
      name: req.body.name,
      type: req.body.type,
      // Parse the moves string to be an array
      moves: req.body.moves.split(", "),
    };

    await Pokemon.create(newPokemon);

    // res.json({
    //     message: "success",
    //     payload: newPokemon
    // });

    // Redirect the client to the single pokemon page for the created pokemon
    res.redirect(`/one-pokemon/${newPokemon.name}`);
  } catch (error) {
    // server-side
    console.log(`createOnePokemon error: ${error}`);

    // client-side
    res.json({
      message: "failure",
      payload: `createOnePokemon error: ${error}`,
    });
  }
}

const deleteOnePokemon = async function (req, res) {
  try {
    const deleteTarget = req.params.name;

    await Pokemon.deleteOne({ name: deleteTarget });

    // res.json({
    //     message: "success",
    //     payload: deleteTarget
    // });

    // Return the client to the webpage that shows the entire collection
    res.redirect("/pokemons");
  } catch (error) {
    // server-side
    console.log(`deleteOnePokemon error: ${error}`);

    // client-side
    res.json({
      message: "failure",
      payload: `deleteOnePokemon error: ${error}`,
    });
  }
}

const updateOnePokemon = async function (req, res) {
  try {
    // Take in front-end form data to generate new document
    const updatedMon = {
      pokedexNo: req.body.pokedexNo,
      name: req.body.name,
      type: req.body.type,
      // Parse the moves string to be an array
      moves: req.body.moves.split(", "),
    };

    await Pokemon.updateOne(
      // Target the document to be updated
      { name: req.params.name },
      // Insert the document, with updated details, where it originally was
      updatedMon,
    );

    // res.json({
    //     message: "success",
    //     payload: updatedMon
    // })

    res.redirect(`/one-pokemon/${updatedMon.name}`);
  } catch (error) {
    // server-side
    console.log(`updateOnePokemon: ${error}`);

    // client-side
    res.json({
      message: "failure",
      payload: `updateOnePokemon: ${error}`,
    });
  }
}

module.exports = {
  getAllPokemon,
  getOnePokemon,
  createOnePokemon,
  deleteOnePokemon,
  updateOnePokemon,
};
