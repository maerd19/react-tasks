const Usuario = require("./../models/Usuarios");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  // Revisar si hay errores en las validaciones del check (route/usuario)
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

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

    // Hashear password
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(password, salt);

    // Guardar usuario
    await usuario.save();

    // Payload del JWT
    const payload = {
      usuario: {
        // usuario.id viene del usuario que se esta guardando
        // Como el token tendra el id del usuario cuando se inicie sesion en el sistema se puede consultar la BD y obtener los proyectos creados por este usuario
        id: usuario.id,
      },
    };

    // Firma y configuracion del JWT
    jwt.sign(
      payload,
      // Firma
      process.env.SECRETA,
      // Configuracion
      {
        expiresIn: 3600, // 1 hora
      },
      (error, token) => {
        // Validar errores
        if (error) throw error;

        // Mensaje de confirmacion
        res.json({ token });
      }
    );

    // Mensaje de confirmacion
    // res.status(201).json({
    //   msg: "Usuario creado correctamente",
    // });
  } catch (error) {
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
