require("dotenv").config();
const express = require('express');
const cors = require('cors');
const processLogger = require("./services/logger");
const mongoDBConncetion = require("./config/mongoDbConnection");
const restaurantAppRouting = require("./router/main-router.router");

const expressApp = async () => {
  try {
    const app = express();
    processLogger("APP Started");

    app.use(cors());
    app.use(express.json());

    await mongoDBConncetion();
    
    app.use('/', restaurantAppRouting);

    const PORT = process.env.PORT;
    if (!PORT) { processLogger('Server PORT Not Found'); process.exit(1); }

    app.listen(PORT, () => {
      let message = `Server Start On PORT : ${PORT}`;
      processLogger(message);
    });

  } catch (error) {
    processLogger(error.message);
    process.exit(1);
  }
};

expressApp();