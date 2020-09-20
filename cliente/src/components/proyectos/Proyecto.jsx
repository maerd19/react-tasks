import React, { useContext, useEffect, useState } from "react";

import proyectoContext from "./../../context/proyectos/proyectoContext";
import tareaContext from "./../../context/tareas/tareaContext";

const Proyecto = ({ proyecto }) => {
  const {
    proyecto: proyectoSeleccionado,
    proyectoActual,
    edicionFormulario,
  } = useContext(proyectoContext);
  const { obtenerTareas } = useContext(tareaContext);

  useEffect(() => {
    setMostrar(false);
    if (proyectoSeleccionado && proyectoSeleccionado[0]._id === proyecto._id) {
      setMostrar(true);
    }
  }, [proyectoSeleccionado]);

  // State del componente
  const [mostrar, setMostrar] = useState(false);

  // Funcion para agregar el proyecto actual
  const seleccionarProyecto = (id) => {
    proyectoActual(id); // Fijar un proyecto actual
    obtenerTareas(id); // Filtrar las tareas cuando se de click
  };

  return (
    <li>
      <button
        type="button"
        className="btn btn-blank"
        onClick={() => seleccionarProyecto(proyecto._id)}
      >
        {proyecto.nombre}{" "}
      </button>

      {mostrar && <button onClick={() => edicionFormulario()}>Editar</button>}
    </li>
  );
};

export default Proyecto;
