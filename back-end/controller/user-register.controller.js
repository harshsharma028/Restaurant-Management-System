const USER_MODEL = require("../model/user.schema");
const processLogger = require("../services/logger");
const { setResponseValue, MESSAGE_CODES } = require("../services/response.setter");
const bcryptjs = require('bcryptjs');

const USER_REGISTER_CONTROLLER = async (request, response) => {
  processLogger(`
    ====================================
    CONTROLLER: USER_REGISTER_CONTROLLER:
    ====================================`);
  try {

    if (!request.body) {
      processLogger(MESSAGE_CODES.REQ_PAYLOAD);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PAYLOAD);
    };

    const { name, email, password, role } = request.body;
    if (!name || !email || !password || !role) {
      processLogger(MESSAGE_CODES.REQ_PARA_MIS);
      return setResponseValue(response, 400, MESSAGE_CODES.REQ_PARA_MIS);
    }

    processLogger(request.body);

    if (role === 'admin') {
      processLogger(MESSAGE_CODES.ADMIN_409);
      return setResponseValue(response, 403, MESSAGE_CODES.ADMIN_409);
    }

    const isUserAlreadyExist = await USER_MODEL.findOne({ email });
    if (isUserAlreadyExist) {
      processLogger(MESSAGE_CODES.USER_EXIST);
      return setResponseValue(response, 409, MESSAGE_CODES.USER_EXIST);
    }

    const hashSalt = Number(process.env.BCRYPT_SALT);
    const hashPassword = await bcryptjs.hash(password, hashSalt);


    const newUser = await USER_MODEL.create({ name, email, passwordHash: hashPassword, role });
    processLogger(MESSAGE_CODES.NEW_USER);
    return setResponseValue(response, 200, MESSAGE_CODES.NEW_USER, {
      user_name: newUser.name,
      user_email: newUser.email,
      user_role: newUser.role
    }, true);

  } catch (error) {
    processLogger(`USER_REGISTER_CONTROLLER: catch -> Error : \n\t ${error.message}`);
    return setResponseValue(response, 500, MESSAGE_CODES.SERVER_ERROR, {});
  }
};

module.exports = USER_REGISTER_CONTROLLER

