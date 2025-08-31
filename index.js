const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const morgan = require("morgan");
const cors = require("cors");
require("./src/mongoDB_config/config");

const corsOptions = require("./src/helpers/cors.dominioFrontend");
app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use("/productos", require("./src/rutas/productos"));
app.use("/turnos", require("./src/rutas/turnos"));

// app.use("/api/usuarios", require("./src/rutas/usuarios"));s
app.use("/usuarios", require("./src/rutas/usuarios"));
app.use("/mascotas", require("./src/rutas/mascotas"));
app.use("/api/consultas", require("./src/rutas/consultas"));
const carritoRoutes = require("./src/rutas/carrito");

app.use("/carrito", carritoRoutes);

const PORT = process.env.PUERTO || 5000;
app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto: ${PORT}`);
});
