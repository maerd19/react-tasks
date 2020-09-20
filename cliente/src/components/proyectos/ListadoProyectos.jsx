import React, { useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Proyecto from "./Proyecto";
import AlertaContext from "./../../context/alertas/alertaContext";
import proyectoContext from "./../../context/proyectos/proyectoContext";

const ListadoProyectos = () => {
  // Extraer proyectos del initialState
  const { mensaje, proyectos, obtenerProyectos } = useContext(proyectoContext);
  const { alerta, mostrarAlerta } = useContext(AlertaContext);

  // Obtener proyectos cuando carga el componente
  useEffect(() => {
    // Si hay un error
    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }
    obtenerProyectos();
  }, [mensaje]);

  // Revisar que proyectos tenga contenido
  if (proyectos.length === 0)
    return <p>No hay proyectos, comienza creando uno</p>;

  return (
    <ul className="listado-proyectos">
      {alerta && (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      )}

      <TransitionGroup>
        {proyectos.map((proyecto) => (
          <CSSTransition key={proyecto._id} timeout={200} classNames="tarea">
            <Proyecto proyecto={proyecto} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </ul>
  );
};

export default ListadoProyectos;
