const { request } = require("express");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");
const RESTAURANT_MODEL = require("../model/restaurant.schema");

const FETCH_APPROVE_PENDING_RESTAURANTS_CONTROLLER = async (request, response) => {
  processLogger(`
    ========================================================
    CONTROLLER: FETCH_APPROVE_PENDING_RESTAURANTS_CONTROLLER:
    ========================================================
    `);

  try {
    const UN_APPROVED_RESTAURANT_LIST = await RESTAURANT_MODEL.find({ isApproved: false });
    if (!UN_APPROVED_RESTAURANT_LIST) {
      processLogger(MESSAGE_CODES.NO_UNAPPROVED_RESTAURANT);
      return setResponseValue(response, 200, MESSAGE_CODES.NO_UNAPPROVED_RESTAURANT, {}, true);
    }
    processLogger(MESSAGE_CODES.REQ_SUCCESS);
    return setResponseValue(response, 200, MESSAGE_CODES.REQ_SUCCESS, { pending_list: UN_APPROVED_RESTAURANT_LIST }, true);
  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
  }
};

module.exports = FETCH_APPROVE_PENDING_RESTAURANTS_CONTROLLER;