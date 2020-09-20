import React, { useState, useContext, useEffect } from "react";
import proyectoContext from "./../../context/proyectos/proyectoContext";

const NuevoProyecto = () => {
  // Obtener el state del formulario
  const {
    formulario,
    edicion,
    proyecto: proyectoSeleccionado,
    errorformulario,
    mostrarFormulario,
    agregarProyecto,
    mostrarError,
    actualizarProyecto,
  } = useContext(proyectoContext);

  // Effect que detecta si hay edicion de proyecto
  useEffect(() => {
    setProyecto({
      nombre: "",
    });

    if (edicion) setProyecto(proyectoSeleccionado[0]);
  }, [edicion]);

  // State para el proyecto
  const [proyecto, setProyecto] = useState({
    nombre: "",
  });

  const { nombre } = proyecto;

  // Lee los contenidos del input
  const onChangeProyecto = (e) => {
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  // El usuario envia un protecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    // Validar el proyecto
    if (nombre.trim() === "") {
      mostrarError();
      return;
    }

    // Es edicion o nuevo proyecto
    if (!edicion) {
      // Agregar al state
      agregarProyecto(proyecto);
    } else {
      // Actualizar proyecto existente
      actualizarProyecto(proyecto);
    }

    // Reinicar el form
    setProyecto({
      nombre: "",
    });
  };

  // Mostrar el formulario
  const onClickFormulario = () => {
    mostrarFormulario();
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-block btn-primario"
        onClick={onClickFormulario}
      >
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            value={!edicion ? "Agregar Proyecto" : "Editar Proyecto"}
            className="btn btn-primario btn-block"
          />
        </form>
      ) : null}

      {errorformulario ? (
        <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
      ) : null}
    </>
  );
};

export default NuevoProyecto;
