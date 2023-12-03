const { Type } = require('../db');
const axios = require('axios');
const { infoApi } = require('../utils/index')

const getAllTypes = async () => {
    
    const typeBd = await Type.findAll();
    const listApi = (await axios.get('https://pokeapi.co/api/v2/type/')).data;
    const pokeApi = infoApi(listApi);
    
    for (const type of pokeApi) {
        const existingType = await Type.findOne({ where: { name: type.name } });

        if (!existingType) {
            await Type.create({
                name: type.name,
            });
        }
    };
    const allTypes = await Type.findAll();
        return allTypes;

    return [...typeBd, ...pokeApi]
};


module.exports = {
    getAllTypes
}