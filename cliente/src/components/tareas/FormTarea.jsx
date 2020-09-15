import React, { useContext, useState, useEffect } from "react";

import proyectoContext from "./../../context/proyectos/proyectoContext";
import tareaContext from "./../../context/tareas/tareaContext";

const FormTarea = () => {
  // Extraer si un proyecto esta activo
  const { proyecto } = useContext(proyectoContext);
  const {
    tareaseleccionada,
    errortarea,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea,
  } = useContext(tareaContext);

  // Effect que detecta si hay una tarea seleccionada
  useEffect(() => {
    setTarea({
      nombre: "",
    });
    if (tareaseleccionada) setTarea(tareaseleccionada);
  }, [tareaseleccionada]);

  // State del formulario
  const [tarea, setTarea] = useState({
    nombre: "",
  });

  // Extraer el nombre del proyecto
  const { nombre } = tarea;

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  // Array destructuring para extraer el proyecto actual
  const [proyectoActual] = proyecto;

  // Leer los valores del formulario
  const handleChange = (e) => {
    setTarea({ ...tarea, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    // Es edicion o nueva tarea
    if (!tareaseleccionada) {
      // Agregar la nueva tarea al State de tareas
      tarea.proyectoId = proyectoActual.id;
      tarea.estado = false;
      agregarTarea(tarea);
    } else {
      // Actualizar tarea existente
      actualizarTarea(tarea);
      // Eliminar tareaseleccionada
      limpiarTarea();
    }

    // Obtener y filtrar las tareas del proyecto actual
    obtenerTareas(proyectoActual.id);

    // Reinicar el form
    setTarea({
      nombre: "",
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            value={tareaseleccionada ? "Editar Tarea" : "Agregar Tarea"}
            className="btn btn-primario btn-submit btn-block"
          />
        </div>
      </form>

      {errortarea ? (
        <p className="mensaje error">El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
