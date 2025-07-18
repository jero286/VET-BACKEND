const express = require("express");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
dotenv.config();

app.listen(process.env.PUERTO, () =>
  console.log("Servidor levantado en el puerto:", process.env.PUERTO)
);

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
