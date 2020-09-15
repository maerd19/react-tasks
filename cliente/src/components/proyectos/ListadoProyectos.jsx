import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Proyecto from "./Proyecto";

import proyectoContext from "./../../context/proyectos/proyectoContext";

const ListadoProyectos = () => {
  // Extraer proyectos del initialState
  const { proyectos, obtenerProyectos } = useContext(proyectoContext);

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    obtenerProyectos();
  }, []);

  // Revisar que proyectos tenga contenido
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto.id} timeout={200} classNames="tarea">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
