const {createPokeDB, getPokeById, getAllPokemon, getPokeByName} = require('../controllers/pokemonControllers')

const  getPokemonHandler = async (req, res) => {
    const {name} = req.query;
    try {
        if(name){
            const pokeByName = await getPokeByName(name)
            res.status(200).json(pokeByName);
        } else {
            const response = await getAllPokemon()
            res.status(200).json(response);
        }
    } catch (error) {

        if(error.message.includes('No se encontró ningún Pokemon')){
            res.status(404).json({error: error.message});
        } else {
            res.status(400).json({error: error.message});

        }
    }
};

const getDetailHandler = async (req, res) => {
    
    const { id } = req.params;

    const source = isNaN(id) ? "bdd" : "api"

    try {
        const response = await getPokeById(id, source)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

const createPokemonHandler = async (req, res) => {
    const { name, img, hp, attack, defense, speed, height, weight } = req.body;

    try {
        const response = await createPokeDB(name, img, hp, attack, defense, speed, height, weight)
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
};

module.exports = {
    getPokemonHandler,
    getDetailHandler,
    createPokemonHandler
}