const { Router } = require('express');
const { getUsersHandler } = require('../handlers/usersHandlers')
const usersRoutes = Router();

usersRoutes.get("/", getUsersHandler);

module.exports = usersRoutes;