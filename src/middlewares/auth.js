const jwt = require("jsonwebtoken");

const auth = (rol) => {
  return (req, res, next) => {
    try {
      const authHeader =
        req.headers["authorization"] ||
        req.headers["auth"] ||
        req.headers["x-access-token"];
      console.log(">>> auth headers recibidos:", {
        authorization: req.headers["authorization"],
        auth: req.headers["auth"],
        x_access_token: req.headers["x-access-token"],
      });

      if (!authHeader) {
        console.log(">>> No se recibió ningún header de autorización");
        return res.status(401).json({ msg: "Falta token" });
      }

      // extraer token si viene con Bearer
      let token = authHeader;
      if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      console.log(">>> Token bruto para verificar:", token);

      // Intento de verificación
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(">>> Decoded JWT:", decoded);

      req.user = decoded;
      if (rol && decoded.rol !== rol) {
        console.log(
          `>>> Rol no coincide: esperado ${rol}, recibido ${decoded.rol}`
        );
        return res.status(403).json({ msg: "No autorizado (rol)" });
      }

      next();
    } catch (error) {
      console.error(
        ">>> Error en auth middleware:",
        error && error.message ? error.message : error
      );
      // devuelve el mensaje de error para debug (quitar en producción)
      return res
        .status(401)
        .json({ msg: "Token inválido o expirado", error: error.message });
    }
  };
};

module.exports = auth;

/* const jwt = require("jsonwebtoken");

const auth = (rol) => (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("HEADER Authorization recibido:", authHeader);

    if (!authHeader) return res.status(401).json({ msg: "No autorizado" });

    const token = authHeader.split(" ")[1];
    console.log("Token limpio:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (rol && decoded.rol !== rol) {
      return res.status(403).json({ msg: "No tienes permisos suficientes" });
    }

    next();
  } catch (error) {
    console.error("Error en middleware auth:", error);
    return res.status(401).json({ msg: "Token inválido o expirado" });
  }
};


module.exports = auth; */
