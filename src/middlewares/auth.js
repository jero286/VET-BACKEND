const jwt = require("jsonwebtoken");

const auth = (rol) => {
  return (req, res, next) => {
    try {
      const authHeader =
        req.headers["authorization"] ||
        req.headers["auth"] ||
        req.headers["x-access-token"];

      if (!authHeader) {
        return res.status(401).json({ msg: "Falta token" });
      }

      let token = authHeader;
      if (typeof token === "string" && token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      if (rol && decoded.rol !== rol) {
        return res.status(403).json({ msg: "No autorizado (rol)" });
      }

      next();
    } catch (error) {
      return res
        .status(401)
        .json({ msg: "Token inválido o expirado", error: error.message });
    }
  };
};

module.exports = auth;
