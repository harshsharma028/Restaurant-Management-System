const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");

const EDIT_RESTAURANT_CONTROLLER = async (request, response) => {
  processLogger(`
    ====================================
    CONTROLLER: EDIT_RESTAURANT_CONTROLLER:
    ====================================
    `);
  try {
    if (!request.body) {
      processLogger(MESSAGE_CODES.REQ_PAYLOAD);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PAYLOAD);
    }

    const restaurant_id = request.params.id;
    console.log('request.headers :>> ', request.params);
    console.log('request.headers :>> ', request.headers);
    console.log('restaurant_id :>> ', restaurant_id);
    if (!restaurant_id) {
      processLogger(MESSAGE_CODES.RES_ID_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.RES_ID_MIS);
    }

    const { restaurant_name, restaurant_address,
      restaurant_cuisine, is_restaurant_active, restaurant_rating } = request.body;

    if (!restaurant_name || !restaurant_address ||
      !restaurant_cuisine || !is_restaurant_active || !restaurant_rating) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }

    const RESTAURANT = await RESTAURANT_MODEL.findById({ _id: restaurant_id });
    if (!RESTAURANT) {
      processLogger(MESSAGE_CODES.ENTER_VALID_RES_ID);
      return setResponseValue(response, 400, MESSAGE_CODES.ENTER_VALID_RES_ID);
    }

    console.log('Before Update Details :>> ', RESTAURANT);

    RESTAURANT.name = restaurant_name;
    RESTAURANT.address = restaurant_address;
    RESTAURANT.cuisineTypes = restaurant_cuisine;
    RESTAURANT.isActive = is_restaurant_active;
    RESTAURANT.averageRating = restaurant_rating;

    await RESTAURANT.save();

    console.log('After Update Details :>> ', RESTAURANT);
    processLogger(MESSAGE_CODES.RESTAURANT_UPDATED);
    processLogger(RESTAURANT);
    return setResponseValue(response, 200, MESSAGE_CODES.RESTAURANT_UPDATED, {
      restaurant_name, restaurant_address, restaurant_cuisine, is_restaurant_active, restaurant_rating
    }, true);

  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
  }
};

module.exports = EDIT_RESTAURANT_CONTROLLER;