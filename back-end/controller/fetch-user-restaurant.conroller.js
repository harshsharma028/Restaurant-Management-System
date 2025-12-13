const RESTAURANT_MODEL = require("../model/restaurant.schema");
const processLogger = require("../services/logger");
const { MESSAGE_CODES, setResponseValue } = require("../services/response.setter");

const FETCH_USER_RESTAURANT_CONTROLLER = async (request, response) => {
  processLogger(`
    ====================================
    CONTROLLER: FETCH_USER_RESTAURANT_CONTROLLER:
    ====================================
    `);
  try {
    const RESTAURANT_LIST = await RESTAURANT_MODEL.find({ isApproved: true });
    console.log('RESTAURANT_LIST :>> ', RESTAURANT_LIST);
    if (!RESTAURANT_LIST) {
      processLogger(MESSAGE_CODES.NO_RES_FOUND);
      return setResponseValue(response, 200, MESSAGE_CODES.NO_RES_FOUND, { restaurant_list: [] }, true);
    }
    processLogger(MESSAGE_CODES.RES_FOUND);
    processLogger(JSON.stringify(RESTAURANT_LIST));
    return setResponseValue(response, 200, MESSAGE_CODES.RES_FOUND, { restaurant_list: RESTAURANT_LIST }, true);
  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
  }
};

module.exports = FETCH_USER_RESTAURANT_CONTROLLER;