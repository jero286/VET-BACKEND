const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
require("./src/mongoDB_config/config");

app.listen(process.env.PUERTO, () =>
  console.log("Servidor levantado en el puerto:", process.env.PUERTO)
);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
