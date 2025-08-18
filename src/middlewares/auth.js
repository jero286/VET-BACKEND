const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("HEADERS:", req.headers); // 👈 Esto ayuda a depurar
  const Authtoken = req.headers["auth"];

  if (!Authtoken) {
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
  } catch {
    return res.status(403).json({ msg: "Token inválido o expirado" });
  }
};

module.exports = authMiddleware;
