const { Pokemon } = require('../db');
const axios = require('axios');
const { Op } = require('sequelize')
const { infoApi } = require('../utils/index')
 
const createPokeDB = async(name, image, hp, attack, defense, speed, height, weight) => {
    return await Pokemon.create({
        name,
        image,
        hp,
        attack,
        defense,
        speed,
        height,
        weight
    });
};


const getPokeById = async (id, source) => {
    const poke = source === "api" ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data 
    : await Pokemon.findByPk(id);
    return poke;
};
     
   

const getAllPokemon = async () => {
    const pokeBD = await Pokemon.findAll();
    const listApi = (await axios.get('https://pokeapi.co/api/v2/pokemon/')).data;
    
    const pokeApi = infoApi(listApi);
    return [...pokeBD, ...pokeApi]
};


const getPokeByName = async (name) => {
    const listApi = (await axios.get('https://pokeapi.co/api/v2/pokemon/')).data;
    const pokeApi = infoApi(listApi);
    
    const pokeDbInstances = (await Pokemon.findAll({
        where: {
            name: {
                [Op.iLike]: name
            }
        }
    }));
    const pokeDb = pokeDbInstances;
    const pokeFiltered = pokeApi.filter(poke => poke.name.toLowerCase() === name.toLowerCase())

    if(pokeFiltered.length === 0 && pokeDb.length === 0) {
        throw new Error(`No se encontró ningún Pokémon con el nombre: ${name}`);
    }

    return [...pokeFiltered,...pokeDb];

};


module.exports = {
    createPokeDB,
    getPokeById,
    getAllPokemon,
    getPokeByName
};

