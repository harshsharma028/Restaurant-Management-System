const RESTAURANT_MENU_MODEL = require("../model/restaurant-menu.schema");
const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");

const ADD_NEW_MENU_CONTROLLER = async (request, response) => {
  try {
    const rest_id = request.params.restaurantId;
    const user_id = request.body.user_id;
    if (!user_id || !rest_id) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }

    const OWNED_REST = await RESTAURANT_MODEL.find({ _id: rest_id, ownerId: user_id });
    if (!OWNED_REST) {
      processLogger(MESSAGE_CODES.RES_ID_WRONG);
      return setResponseValue(response, 409, MESSAGE_CODES.RES_ID_WRONG);
    }

    const { menu_name, menu_description, menu_price, is_manu_available, manu_category } = request.body;
    if (!menu_name || !menu_description || !menu_price || !is_manu_available || !manu_category) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }

    const NEW_MENU = await RESTAURANT_MENU_MODEL.create({
      restaurantId: rest_id,
      name: menu_name,
      description: menu_description,
      price: menu_price,
      isAvailable: is_manu_available,
      category: manu_category,
    });

    processLogger(MESSAGE_CODES.MENU_ADDED);
    return setResponseValue(response, 200, MESSAGE_CODES.MENU_ADDED, NEW_MENU, true);

  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SOMETHING_WRONG);
  }
};

module.exports = ADD_NEW_MENU_CONTROLLER;