const jwt = require("jsonwebtoken");

const auth = (rol) => {
  return (req, res, next) => {
    const token = req.headers["authorization"]; // usar header estándar
    if (!token) {
      return res.status(401).json({ msg: "Falta token" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // 👈 aquí guardamos el usuario

      // Si quieres validar el rol
      if (rol && decoded.rol !== rol) {
        return res.status(403).json({ msg: "No autorizado" });
      }

      next();
    } catch (error) {
      return res.status(401).json({ msg: "Token inválido" });
    }
  };
};

module.exports = auth;

