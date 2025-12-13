const USER_MODEL = require("../model/user.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const USER_LOGIN_CONTROLLER = async (request, response) => {
  processLogger(`
    ====================================
    CONTROLLER: USER_REGISTER_CONTROLLER:
    ====================================
    `);

  try {
    if (!request.body) {
      processLogger(MESSAGE_CODES.REQ_PAYLOAD);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PAYLOAD);
    }

    const { email, password } = request.body;
    if (!email || !password) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }

    processLogger(JSON.stringify(request.body));

    const isUserExist = await USER_MODEL.findOne({ email });
    if (!isUserExist) {
      processLogger(MESSAGE_CODES.CRED_INVALID);
      return setResponseValue(response, 404, MESSAGE_CODES.CRED_INVALID);
    }

    processLogger(isUserExist);

    const isPasswordMatched = await bcryptjs.compare(password, isUserExist.passwordHash);
    if (!isPasswordMatched) {
      processLogger(MESSAGE_CODES.CRED_INVALID);
      return setResponseValue(response, 404, MESSAGE_CODES.CRED_INVALID);
    }

    processLogger(isPasswordMatched);

    const USER_PAYLOAD = {
      user_name: isUserExist.name,
      user_email: isUserExist.email,
      user_role: isUserExist.role,
      user_id: isUserExist._id
    };
    const JWT_SERCRET_KEY = process.env.JWT_SECREATE_KEY;
    console.log('JWT_SERCRET_KEY :>> ', JWT_SERCRET_KEY);
    const JWT_TOKEN = await jsonwebtoken.sign(USER_PAYLOAD, JWT_SERCRET_KEY, { expiresIn: '1d' });
    processLogger(JWT_TOKEN);

    processLogger(MESSAGE_CODES.LOGIN_SUC);
    USER_PAYLOAD['token'] = JWT_TOKEN;
    return setResponseValue(response, 200, MESSAGE_CODES.LOGIN_SUC, USER_PAYLOAD);


  } catch (error) {
    processLogger(error.message);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR);
  }
};

module.exports = USER_LOGIN_CONTROLLER;