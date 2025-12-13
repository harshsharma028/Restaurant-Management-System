const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");

const EDIT_RESTAURANT_APPROVED_STATUS_CONTROLLER = async (request, response) => {
  processLogger(`
    ========================================================
    CONTROLLER: EDIT_RESTAURANT_APPROVED_STATUS_CONTROLLER:
    ========================================================
    `);
  try {
    const rest_id = request.params.id;
    const is_rest_approved = request.body.is_rest_approved;
    if (!rest_id || !is_rest_approved) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }

    const RESTAURANT = await RESTAURANT_MODEL.findById({ _id: rest_id });
    if (!RESTAURANT) {
      processLogger(MESSAGE_CODES.RES_ID_WRONG);
      return setResponseValue(response, 409, MESSAGE_CODES.RES_ID_WRONG);
    }

    processLogger(RESTAURANT);

    RESTAURANT.isApproved = is_rest_approved;
    await RESTAURANT.save();

    processLogger(MESSAGE_CODES.RESTAURANT_UPDATED);
    return setResponseValue(response, 200, MESSAGE_CODES.RESTAURANT_UPDATED);

  } catch (error) {
    processLogger(error);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
  }
};

module.exports = EDIT_RESTAURANT_APPROVED_STATUS_CONTROLLER;