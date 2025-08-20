const jwt = require("jsonwebtoken");

module.exports = (rolUsuario) => (req, res, next) => {
  const token = req.header("auth");
  const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);
  if (rolUsuario === usuarioVerificado.rol) {
    req.usuario = {
      idUsuario: usuarioVerificado.idUsuario,
      rol: usuarioVerificado.rol,
      idCarrito: usuarioVerificado.idCarrito,
      idTurno: usuarioVerificado.idTurno 
    }
    next();
  } else {
    res.status(401).json({ msg: "No estás autorizado" });
  }
}