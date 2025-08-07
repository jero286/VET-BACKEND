const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers["auth"];

  if (!token) {
    return res.status(401).json({ msg: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Inyectamos info útil en req.user
    req.user = {
      id: decoded.idUsuario,
      rol: decoded.rol,
    };

    next();
  } catch (error) {
    return res.status(403).json({ msg: "Token inválido o expirado", error });
  }
};

module.exports = authMiddleware;
