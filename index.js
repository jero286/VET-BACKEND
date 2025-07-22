const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
require("./src/mongoDB_config/config");

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Rutas
app.use("/productos", require("./src/rutas/productos"))

app.listen(5000, () => console.log("Servidor levantado en el puerto:", 5000));