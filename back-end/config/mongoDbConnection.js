const { default: mongoose } = require("mongoose");
const processLogger = require("../services/logger");

const mongoDBConncetion = async () => {
  try {
    const DB_CONNECTION_STR = process.env.DB_CONNECTION_STR;
    const DB_NAME = 'mogodb_test';
    if (!DB_CONNECTION_STR) {
      processLogger('DB Connection String Not Fount');
      process.exit(1);
    }

    await mongoose.connect(DB_CONNECTION_STR, { dbName: DB_NAME });
    processLogger(`${DB_NAME} DB Connection Success`);

  } catch (error) {
    processLogger(error.message);
    process.exit(1);
  }
};

module.exports = mongoDBConncetion;