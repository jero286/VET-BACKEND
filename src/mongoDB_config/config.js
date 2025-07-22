const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_PASS)
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log(error));