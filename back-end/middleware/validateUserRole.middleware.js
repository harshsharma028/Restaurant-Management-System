const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");
const ONWER_ROLE = 'owner';
const ADMIN_ROLE = 'admin';
const CUSTOMER_ROLE = 'customer';

const VALIDATE_OWNER_ROLE = async (request, response, next) => {
  try {
    const userRole = request.body.user_role;
    if (!userRole) {
      processLogger(MESSAGE_CODES.USER_ROLE_MIS);
      return setResponseValue(response, 401, MESSAGE_CODES.USER_ROLE_MIS);
    }
    if (ONWER_ROLE !== userRole) {
      processLogger(MESSAGE_CODES.NOT_AUTH_ACTION);
      return setResponseValue(response, 403, MESSAGE_CODES.NOT_AUTH_ACTION);
    }
    processLogger(MESSAGE_CODES.AUTH_ROLE_ACTION);
    next();
  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SOMETHING_WRONG);
  }
};

const VALIDATE_ADMIN_ROLE = async (request, response, next) => {
  try {
    const userRole = request.body.user_role;
    if (!userRole) {
      processLogger(MESSAGE_CODES.USER_ROLE_MIS);
      return setResponseValue(response, 401, MESSAGE_CODES.USER_ROLE_MIS);
    }
    if (ADMIN_ROLE !== userRole) {
      processLogger(MESSAGE_CODES.NOT_AUTH_ACTION);
      return setResponseValue(response, 403, MESSAGE_CODES.NOT_AUTH_ACTION);
    }
    processLogger(MESSAGE_CODES.AUTH_ROLE_ACTION);
    next();
  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SOMETHING_WRONG);
  }
};

const VALIDATE_CUSTOMER_ROLE = async (request, response, next) => {
  try {
    const userRole = request.body.user_role;
    if (!userRole) {
      processLogger(MESSAGE_CODES.USER_ROLE_MIS);
      return setResponseValue(response, 401, MESSAGE_CODES.USER_ROLE_MIS);
    }
    if (CUSTOMER_ROLE !== userRole) {
      processLogger(MESSAGE_CODES.NOT_AUTH_ACTION);
      return setResponseValue(response, 403, MESSAGE_CODES.NOT_AUTH_ACTION);
    }
    processLogger(MESSAGE_CODES.AUTH_ROLE_ACTION);
    next();
  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SOMETHING_WRONG);
  }
};

module.exports = {
  VALIDATE_OWNER_ROLE,
  VALIDATE_ADMIN_ROLE,
  VALIDATE_CUSTOMER_ROLE
};