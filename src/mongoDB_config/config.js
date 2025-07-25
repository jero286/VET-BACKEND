const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGO_PASS)
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));