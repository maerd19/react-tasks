import React, { useContext } from "react";

import proyectoContext from "./../../context/proyectos/proyectoContext";
import tareaContext from "./../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  const { proyecto } = useContext(proyectoContext);
  const { eliminarTarea, obtenerTareas, cambiarEstadoTarea } = useContext(
    tareaContext
  );

  // El usuario elimina una tarea
  const tareaEliminar = (id) => {
    eliminarTarea(id);
    obtenerTareas(proyecto[0].id);
  };

  // Funcion que modifica el estado de las tareas
  const cambiarEstado = (tarea) => {
    tarea.estado = tarea.estado ? false : true;
    cambiarEstadoTarea(tarea);
  };

  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>

      <div className="estado">
        {tarea.estado ? (
          <button
            type="button"
            className="completo"
            onClick={() => cambiarEstado(tarea)}
          >
            Completo
          </button>
        ) : (
          <button
            type="button"
            className="incompleto"
            onClick={() => cambiarEstado(tarea)}
          >
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-primario">
          Editar
        </button>
        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => tareaEliminar(tarea.id)}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
