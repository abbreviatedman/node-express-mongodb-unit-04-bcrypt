// Gives access to the database collection
const Pokemon = require("../../models/pokemonModel");

// promises to return with every document in the collection in JSON
async function getAllPokemon(req, res) {
  try {
    // result awaits the promise
    let result = await Pokemon.find({});

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

// promises to return with ONE document in the collection
async function getOnePokemon(req, res) {
  try {
    // result holds ONE document that was searched by name
    let result = await Pokemon.find({ Name: req.params.name });

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

// promises to Post a new document to the Pokemon collection
async function createOnePokemon(req, res) {
  try {
    // Accept the front-end form data from the client, generates the document
    let newPokemon = {
      PokedexNo: req.body.PokedexNo,
      Name: req.body.Name,
      Type: req.body.Type,
      // Parse the Moves string to be an array
      Moves: req.body.Moves.split(", "),
    };

    // Post new document to the Pokemon collection
    await Pokemon.create(newPokemon);

    // res.json({
    //     message: "success",
    //     payload: newPokemon
    // });

    // Redirect the client to the single pokemon page for the created pokemon
    res.redirect(`/oneMon/${newPokemon.Name}`);
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

// promises to Find ONE document by name and remove it from the collection
async function deleteOnePokemon(req, res) {
  try {
    let deleteTarget = req.params.name;

    // Find ONE document by name and remove it from the collection
    await Pokemon.deleteOne({ Name: deleteTarget });

    // res.json({
    //     message: "success",
    //     payload: deleteTarget
    // });

    // Return the client to the webpage that shows the entire collection
    res.redirect("/allMons");
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

// promises to find ONE document by name and update the document in the collection
async function updateOnePokemon(req, res) {
  try {
    // let updatedMon = req.body;

    // Take in front-end form data to generate new document
    let updatedMon = {
      PokedexNo: req.body.PokedexNo,
      Name: req.body.Name,
      Type: req.body.Type,
      // Parse the Moves string to be an array
      Moves: req.body.Moves.split(", "),
    };

    await Pokemon.updateOne(
      // Target the document to be updated
      { Name: req.params.name },
      // Insert the document, with updated details, where it originally was
      { $set: updatedMon },
      // Upsert is update + insert. This setting is = true
      { upsert: true }
    );

    // res.json({
    //     message: "success",
    //     payload: updatedMon
    // })

    res.redirect(`/oneMon/${updatedMon.Name}`);
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
