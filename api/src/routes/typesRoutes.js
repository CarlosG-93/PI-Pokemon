const { Router } = require('express');
const { getTypeHandler } = require('../handlers/typeHandlers');
const typesRoutes = Router();

typesRoutes.get("/", getTypeHandler);


module.exports = typesRoutes;