const express = require('express');
const processLogger = require('../services/logger');
const USER_REGISTER_CONTROLLER = require('../controller/user-register.controller');
const USER_LOGIN_CONTROLLER = require('../controller/user-login.controller');

const restaurantAuthRouter = express.Router();
processLogger("APP Auth Router Initilized......");

restaurantAuthRouter.post('/register', USER_REGISTER_CONTROLLER);

restaurantAuthRouter.post('/login', USER_LOGIN_CONTROLLER);

module.exports = restaurantAuthRouter;