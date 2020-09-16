const Usuario = require("./../models/Usuarios");

exports.crearUsuario = async (req, res) => {
  // extraer email y password
  const { email, password } = req.body;

  try {
    // Revisar que el usuario registrado sea unico
    let usuario = await Usuario.findOne({ email });

    if (usuario)
      return res.status(400).json({
        msg: "El usuario ya existe",
      });

    // Crear nuevo usuario
    usuario = new Usuario(req.body);

    // Guardar usuario
    await usuario.save();

    // Mensaje de confirmacion
    res.status(201).json({
      msg: "Usuario creado correctamente",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
