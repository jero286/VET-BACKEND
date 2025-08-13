const jwt = require("jsonwebtoken");

module.exports = (rolUsuario) => (req, res, next) => {
  const token = req.header("auth");
  const usuarioVerificado = jwt.verify(token, process.env.JWT_SECRET);
  if (rolUsuario === usuarioVerificado.rol) {
    req.usuario = {
      _id: usuarioVerificado.idUsuario,
      rol: usuarioVerificado.rolUsuario,
      idCarrito: usuarioVerificado.idCarrito,
      idTurno: usuarioVerificado.idTurno 
    }
    next();
  } else {
    res.status(401).json({ msg: "No estás autorizado" });
  }
}