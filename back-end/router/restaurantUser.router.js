const express = require('express');
const { VALIDATE_OWNER_ROLE, VALIDATE_ADMIN_ROLE, VALIDATE_CUSTOMER_ROLE } = require('../middleware/validateUserRole.middleware');
const ADD_RESTAURANT_CONTROLLER = require('../controller/add-restaurant.controller');
const FETCH_RESTAURANT_CONTROLLER = require('../controller/fetch-restaurant.controller');
const EDIT_RESTAURANT_CONTROLLER = require('../controller/edit-restaurant.contoller');
const FETCH_APPROVE_PENDING_RESTAURANTS_CONTROLLER = require('../controller/fetch-approve-pending-restaurant');
const processLogger = require('../services/logger');
const EDIT_RESTAURANT_APPROVED_STATUS_CONTROLLER = require('../controller/edit-resturant-approved-status.controller');
const FETCH_USER_RESTAURANT_CONTROLLER = require('../controller/fetch-user-restaurant.conroller');
const ADD_NEW_MENU_CONTROLLER = require('../controller/add-new-manu.contoller');
const FETCH_RESTAURANT_MENU_LIST_CONTROLLER = require('../controller/fetch-restaurant-menu-list.controller');
const UPDATE_MENU_CONTROLLER = require('../controller/update-menu.controller');
const DELETE_MENU_CONTROLLER = require('../controller/delete-restaurant-manu.controller');
const { UPDATE_RESTAURANT_ORDER_LIST_CONTROLLER, FETCH_RESTAURANT_ORDER_LIST_CONTROLLER } = require('../controller/order-manager-user-owener.controller');

const restaurantUserRouter = express.Router();
processLogger("APP User Router Initilized......");

// --------------------------------------
// Owner API's
// --------------------------------------
restaurantUserRouter.post('/owner/add-restaurants', VALIDATE_OWNER_ROLE, ADD_RESTAURANT_CONTROLLER);
restaurantUserRouter.get('/owner/restaurants', VALIDATE_OWNER_ROLE, FETCH_RESTAURANT_CONTROLLER);
restaurantUserRouter.patch('/owner/restaurants/:id', VALIDATE_OWNER_ROLE, EDIT_RESTAURANT_CONTROLLER);
// Add New Manu in Restaurant
restaurantUserRouter.post('/owner/restaurants/:restaurantId/menu-items', VALIDATE_OWNER_ROLE, ADD_NEW_MENU_CONTROLLER);
restaurantUserRouter.patch('/owner/menu-items/:id', VALIDATE_OWNER_ROLE, UPDATE_MENU_CONTROLLER);
restaurantUserRouter.delete('/owner/menu-items/:id', VALIDATE_OWNER_ROLE, DELETE_MENU_CONTROLLER);

restaurantUserRouter.get('/owner/orders', VALIDATE_OWNER_ROLE, FETCH_RESTAURANT_ORDER_LIST_CONTROLLER);
restaurantUserRouter.patch('/orders/:orderId/status', VALIDATE_OWNER_ROLE, UPDATE_RESTAURANT_ORDER_LIST_CONTROLLER);
// 

// --------------------------------------
// Admin API's
// --------------------------------------
restaurantUserRouter.get('/admin/restaurants/pending', VALIDATE_ADMIN_ROLE, FETCH_APPROVE_PENDING_RESTAURANTS_CONTROLLER);
restaurantUserRouter.patch('/admin/restaurants/:id/approve', VALIDATE_ADMIN_ROLE, EDIT_RESTAURANT_APPROVED_STATUS_CONTROLLER);

// --------------------------------------
// Customer API's 
// --------------------------------------
restaurantUserRouter.get('/customer/restaurants', VALIDATE_CUSTOMER_ROLE, FETCH_USER_RESTAURANT_CONTROLLER);
restaurantUserRouter.get('/customer/restaurants/:restaurantId/menu-items', VALIDATE_CUSTOMER_ROLE, FETCH_RESTAURANT_MENU_LIST_CONTROLLER);


module.exports = restaurantUserRouter;


