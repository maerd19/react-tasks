const Usuario = require("./../models/Usuarios");

exports.crearUsuario = async (req, res) => {
  try {
    let usuario;

    // Crear nuevo usuario
    usuario = new Usuario(req.body);

    // Guardar usuario
    await usuario.save();

    // Mensaje de confirmacion
    res.status(201).send("Usuario creado correctamente");
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
