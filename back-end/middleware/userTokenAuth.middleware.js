const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");
const jsonwebtoken = require('jsonwebtoken');

const VALIDATE_USER = async (request, response, next) => {
  try {
    const user_token = request.headers.authorization;
    if (!user_token) {
      processLogger(MESSAGE_CODES.TOKEN_MIS);
      return setResponseValue(response, 401, MESSAGE_CODES.TOKEN_MIS);
    }

    const JWT_SERCRET_KEY = process.env.JWT_SECREATE_KEY;
    const user_auth_details = jsonwebtoken.verify(user_token, JWT_SERCRET_KEY);
    console.log('user_auth_details :>> ', user_auth_details);
    if (!user_auth_details) {
      processLogger(MESSAGE_CODES.UN_AUTH_USER);
      return setResponseValue(response, 401, MESSAGE_CODES.UN_AUTH_USER);
    }
    processLogger(JSON.stringify(user_auth_details));

    if (!request.body) { request.body = {}; }
    Object.assign(request.body, user_auth_details);
    processLogger("Auth Success!!");
    next();

  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SOMETHING_WRONG);
  }
};

module.exports = VALIDATE_USER;