const RESTAURANT_MENU_MODEL = require("../model/restaurant-menu.schema");
const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { MESSAGE_CODES, setResponseValue } = require("../services/response.setter");

const UPDATE_MENU_CONTROLLER = async (request, response) => {
  try {
    const menu_id = request.params.id;
    if (!menu_id) {
      processLogger(MESSAGE_CODES.MENU_ID_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.MENU_ID_MIS);
    }

    const RES_MANU = await RESTAURANT_MENU_MODEL.findById({ _id: menu_id });
    if (!RES_MANU) {
      processLogger(MESSAGE_CODES.NO_MENU);
      return setResponseValue(response, 409, MESSAGE_CODES.NO_MENU);
    }

    processLogger(RES_MANU);

    const IS_REST_OWN_BY_USER = await RESTAURANT_MODEL.find({ _id: RES_MANU.restaurantId, ownerId: request.body.user_id }).lean();
    if (!IS_REST_OWN_BY_USER) {
      processLogger(MESSAGE_CODES.NOT_AUTH_TO_ADD_MANU);
      return setResponseValue(response, 409, MESSAGE_CODES.NOT_AUTH_TO_ADD_MANU);
    }

    processLogger(IS_REST_OWN_BY_USER);

    const { menu_name, menu_description, menu_price, is_manu_available, manu_category } = request.body;
    if (!menu_name || !menu_description || !menu_price || !is_manu_available || !manu_category) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }

    RES_MANU.name = menu_name;
    RES_MANU.description = menu_description;
    RES_MANU.price = menu_price;
    RES_MANU.isAvailable = is_manu_available;
    RES_MANU.category = manu_category;

    await RES_MANU.save();

    processLogger(MESSAGE_CODES.MENU_UPDATED);
    return setResponseValue(response, 200, MESSAGE_CODES.MENU_UPDATED, { data: RES_MANU }, true);


  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
  }
};

module.exports = UPDATE_MENU_CONTROLLER;