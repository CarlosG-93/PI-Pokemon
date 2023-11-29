const { Router } = require('express');
const { getPokemonHandler, getNameHandler, getDetailHandler, createPokemonHandler } = require('../handlers/pokemonHandlers.js');
const pokemonRoutes = Router();

// pokemonRoutes.get("/search" , getNameHandler)

pokemonRoutes.get("/", getPokemonHandler);

pokemonRoutes.get("/:id", getDetailHandler);

pokemonRoutes.post("/", createPokemonHandler);

module.exports = pokemonRoutes;