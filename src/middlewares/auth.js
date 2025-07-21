const jwt = require("jsonwebtoken");

module.exports = (rolUsuario) => (req, res, next) => {
  const token = req.header("auth");
  const usuarioVerificado = jwt.verify(token /* JWTPASS */);
  if (rolUsuario === usuarioVerificado.rol) {
    /* Los datos de los reqs que deben sobrevivir */
    next();
  } else {
    res.status(401).json({ msg: "No estás autorizado" });
  }
};
