const processLogger = require("./logger");
const jsonwebtoken = require('jsonwebtoken');

const TOKEN_EXTRACTOR = async (auth_user_token) => {
  try {
    if (!auth_user_token) { processLogger('TOKEN_EXTRACTOR: token Value is Missing!'); return null; }

    const JWT_SERCRET_KEY = process.env.JWT_SECREATE_KEY;
    const user_auth_details = await jsonwebtoken.verify(auth_user_token, JWT_SERCRET_KEY);
    return user_auth_details;
  } catch (error) {
    processLogger(error.message);
    return null;
  }
};

module.exports = TOKEN_EXTRACTOR;