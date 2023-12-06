const { Pokemon, Type } = require('../db');
const axios = require('axios');
 
const createPokeDB = async(name,img,hp,attack,defense,speed,height,weight,type = 'unknown')=>{
    if(!name || !img || !hp || !attack || !defense ){
        throw Error('Campos obligatorios estan vacios')
    }
    const pokemon = await Pokemon.create({name,img,hp,attack,defense,speed,height,weight})
    const typee = type.split(',')
    typee.map(async(t)=>{
        const types = await Type.findOne({where: {name: t}})
        pokemon.addType(types)
    })

    return pokemon
};

// const getPokeById = async (id, source) => {
//     const poke = source === "api" ? (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data 
//     : await Pokemon.findByPk(id);
//     return poke;
// };

const getPokeById = async (id)=>{
    if(isNaN(id)){
        const response = await Pokemon.findOne({where: {id}});
        return response
    }
    const res = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)).data
    return {
        id: res.id,
        name: res.name,
        img: res.sprites.other.dream_world.front_default,
        hp: res.stats[0].base_stat,
        attack: res.stats[1].base_stat,
        defense:res.stats[2].base_stat,
        speed: res.stats[5].base_stat,
        height: res.height,
        weight: res.weight,
        types: res.types.map((t)=>{
            return {
                name: t.type.name,
            }
    })
}
};
     
const getPokeBd = async ()=>{
    const response = await Pokemon.findAll({
        include:{
            attributes: ['name'],
            model : Type,
            through: {
                attributes: [],
                },
        }
    })
        return response;
};

const getPokeApi = async ()=>{
    let allPokemonsApi = []
    const infoApi = (await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=60')).data.results
    const allPokemonsProm = []
    infoApi.map((p)=>{
        allPokemonsProm.push(axios.get(p.url))
    })

    await Promise.all(allPokemonsProm)
    .then((pokemon)=>{
        allPokemonsApi = pokemon.map((p)=>{
            return{
                id: p.data.id,
                name: p.data.name,
                img: p.data.sprites.other.dream_world.front_default,
                hp: p.data.stats[0].base_stat,
                attack: p.data.stats[1].base_stat,
                defense:p.data.stats[2].base_stat,
                speed: p.data.stats[5].base_stat,
                height: p.data.height,
                weight: p.data.weight,
                types: p.data.types.map((t)=>{
                    return {
                        name: t.type.name,
                    }
                })  
        }
    })
}) 
    return allPokemonsApi;
};

const getAllPokemon = async () => {
    const pokeApi = await getPokeApi();    
    const pokeBd = await getPokeBd();
    return [...pokeApi, ...pokeBd]
};


const getPokeByName = async (name)=>{
    const res = (await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)).data
    if(res) {
            return[{
         id: res.id,
        name: res.name,
        img: res.sprites.other.dream_world.front_default,
        hp: res.stats[0].base_stat,
        attack: res.stats[1].base_stat,
        defense:res.stats[2].base_stat,
        speed: res.stats[5].base_stat,
        height: res.height,
        weight: res.weight,
        types: res.types.map((t)=>{
            return {
                name: t.type.name,
            }
            })
        }]
        }
        else {
            throw Error('No existe un Pokemon con ese nombre')
        }
        
    };

module.exports = {
    createPokeDB,
    getPokeById,
    getAllPokemon,
    getPokeByName
};

