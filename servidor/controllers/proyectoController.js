const Proyecto = require("./../models/Proyecto");
const { validationResult } = require("express-validator");

exports.crearProyecto = async (req, res) => {
  // Revisar si hay errores en las validaciones del check (route/proyectos)
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  try {
    // Crear un nuevo proyecto
    const proyecto = new Proyecto(req.body);

    // Guargar el creador del proyecto via JWT
    proyecto.creador = req.usuario.id;

    // Guardamos el proyecto
    proyecto.save();
    res.status(201).json(proyecto);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({
      creado: -1,
    });
    res.json({ proyectos });
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error");
  }
};

// Actualiza un proyecto
exports.actualizarProyecto = async (req, res) => {
  // Extraer la informacion del proyecto
  const { nombre } = req.body;

  try {
    // Revisar el ID
    let proyecto = await Proyecto.findById(req.params.id);

    // El proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificar que la persona que envia la peticion para modificar sea el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status.status(401).json({ msg: "Accion no autorizada" });
    }

    // Crear un objeto con la nueva informacion

    const nuevoProyecto = {};

    nuevoProyecto.nombre = nombre;

    // Actualizar
    proyecto = await Proyecto.findByIdAndUpdate(
      { _id: req.params.id },
      nuevoProyecto,
      { new: true }
    );

    res.json({ proyecto });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};

// Elimina un proyecto
exports.eliminarProyecto = async (req, res) => {
  try {
    // Revisar el ID
    let proyecto = await Proyecto.findById(req.params.id);

    // El proyecto existe o no
    if (!proyecto) {
      return res.status(404).json({ msg: "Proyecto no encontrado" });
    }

    // Verificar que la persona que envia la peticion para eliminar sea el creador del proyecto
    if (proyecto.creador.toString() !== req.usuario.id) {
      return res.status.status(401).json({ msg: "Accion no autorizada" });
    }

    // Eliminar
    await Proyecto.findOneAndRemove({ _id: req.params.id });
    res.json({ msg: "Proyecto eliminado" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error en el servidor");
  }
};
