const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");
const TOKEN_EXTRACTOR = require("../services/token-extractor.service");

const ADD_RESTAURANT_CONTROLLER = async (request, response) => {
  processLogger(`
      ====================================
      CONTROLLER: ADD_RESTAURANT_CONTROLLER:
      ====================================
      `);
  try {

    if (!request.body) {
      processLogger(MESSAGE_CODES.REQ_PAYLOAD);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PAYLOAD);
    }

    const { restaurant_name, restaurant_address, restaurant_cuisine, is_restaurant_active, restaurant_rating, user_name, user_email, user_role, user_id } = request.body;

    if (!user_name || !user_email || !user_role ||
      !user_id || !restaurant_name || !restaurant_address ||
      !restaurant_cuisine || !is_restaurant_active || !restaurant_rating) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }
    processLogger(JSON.stringify(request.body));

    const NEW_RESTAURNT = await RESTAURANT_MODEL.create({
      name: restaurant_name,
      address: restaurant_address,
      ownerId: user_id,
      cuisineTypes: restaurant_cuisine,
      isActive: is_restaurant_active,
      averageRating: restaurant_rating
    });
    processLogger(MESSAGE_CODES.NEW_RES_ADD);
    return setResponseValue(response, 200, MESSAGE_CODES.NEW_RES_ADD, NEW_RESTAURNT, true);

  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
  }
};

module.exports = ADD_RESTAURANT_CONTROLLER;