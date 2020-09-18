const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Leer token del header
  const token = req.header("x-auth-token");

  // Revisar si hay token
  if (!token) {
    return res.status(401).json({ msg: "No hay token, permiso no valido" });
  }

  // Validar token
  try {
    const cifrado = jwt.verify(token, process.env.SECRETA);
    // cifrado.usuario se obtiene del payload de JWT. Almacena el Id del usuario que esta accediendo y lo hace disponible en req
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Token invalido" });
  }
};
