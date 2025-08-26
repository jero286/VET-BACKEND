const jwt = require("jsonwebtoken");

const auth = (rol) => {
  return (req, res, next) => {
    let token =
      req.headers["authorization"] ||
      req.headers["auth"] ||
      req.headers["x-access-token"];
    if (!token) return res.status(401).json({ msg: "Falta token" });

    if (token.startsWith("Bearer ")) token = token.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      if (rol && decoded.rol !== rol)
        return res.status(403).json({ msg: "No autorizado" });
      next();
    } catch (error) {
      return res.status(401).json({ msg: "Token inválido" });
    }
  };
};

module.exports = auth;
