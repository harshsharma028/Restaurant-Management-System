const express = require('express');
const restaurantAuthRouter = require('./restaurantAuthRouter.router');
const processLogger = require('../services/logger');
const VALIDATE_USER = require('../middleware/userTokenAuth.middleware');
const restaurantUserRouter = require('./restaurantUser.router');
const { FETCH_USER_ORDERS_LIST, PLACE_NEW_ORDER } = require('../controller/order-manager-user-owener.controller');
const { FETCH_USER_CART_DETAIL_CONTROLLER, ADD_USER_CART_DETAIL_CONTROLLER, UPDATE_USER_CART_DETAIL_CONTROLLER, CLEAR_USER_CART_DETAIL_CONTROLLER } = require('../controller/user-cart-managment.controller');


const restaurantAppRouting = express.Router();
processLogger("APP Routing Initlized........");


restaurantAppRouting.use('/auth', restaurantAuthRouter);

restaurantAppRouting.use('/user', VALIDATE_USER, restaurantUserRouter);

// Cart Routing
restaurantAppRouting.get('/cart', VALIDATE_USER, FETCH_USER_CART_DETAIL_CONTROLLER);
restaurantAppRouting.post('/cart/items', VALIDATE_USER, ADD_USER_CART_DETAIL_CONTROLLER);
restaurantAppRouting.patch('/cart/items/:itemId', VALIDATE_USER, UPDATE_USER_CART_DETAIL_CONTROLLER);
restaurantAppRouting.delete('/cart', VALIDATE_USER, CLEAR_USER_CART_DETAIL_CONTROLLER);

// Order Routing
restaurantAppRouting.post('/orders', VALIDATE_USER, PLACE_NEW_ORDER);
restaurantAppRouting.get('/orders/my/:order_id', VALIDATE_USER, FETCH_USER_ORDERS_LIST);


module.exports = restaurantAppRouting;