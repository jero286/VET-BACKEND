const jwt = require("jsonwebtoken");

module.exports = (rolUsuario) => (req, res, next) => {
  const token = req.header("auth");
  const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);
  if (rolUsuario === usuarioVerificado.rol) {
    req.idUsuario = usuarioVerificado.idUsuario;
    req.idCarrito = usuarioVerificado.idCarrito;
    req.idTurno = usuarioVerificado.idTurno;
    next();
  } else {
    res.status(401).json({ msg: "No estás autorizado" });
  }
};
