const RESTAURANT_MENU_MODEL = require("../model/restaurant-menu.schema");
const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { MESSAGE_CODES, setResponseValue } = require("../services/response.setter");

const FETCH_RESTAURANT_MENU_LIST_CONTROLLER = async (request, response) => {
  try {
    const rest_id = request.params.restaurantId;
    if (!rest_id) {
      processLogger(MESSAGE_CODES.RES_ID_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.RES_ID_MIS);
    }

    const IS_RESTAUARNT_APPROVED = await RESTAURANT_MODEL.findById({ _id: rest_id });
    if (!IS_RESTAUARNT_APPROVED) {
      processLogger(MESSAGE_CODES.NOT_APPROVED);
      return setResponseValue(response, 409, MESSAGE_CODES.NOT_APPROVED);
    }

    const MENU_LIST = await RESTAURANT_MENU_MODEL.find({
      restaurantId: rest_id,
      isAvailable: true
    });

    if (!MENU_LIST) {
      processLogger(MESSAGE_CODES.NO_MENU);
      return setResponseValue(response, 200, MESSAGE_CODES.NO_MENU, { data: [] }, true);
    }
    processLogger(MESSAGE_CODES.REQ_SUCCESS);
    return setResponseValue(response, 200, MESSAGE_CODES.REQ_SUCCESS, { data: MENU_LIST }, true);

  } catch (error) {
    processLogger(MESSAGE_CODES.SOMETHING_WRONG);
    return setResponseValue(response, 500, MESSAGE_CODES.SOMETHING_WRONG);
  }
};

module.exports = FETCH_RESTAURANT_MENU_LIST_CONTROLLER;