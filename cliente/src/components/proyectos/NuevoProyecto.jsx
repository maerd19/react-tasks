import React, { useState } from "react";

const NuevoProyecto = () => {
  // State para el proyecto
  const [proyecto, setProyecto] = useState({
    nombre: "",
  });
  const [error, setError] = useState(false);

  const { nombre } = proyecto;

  // Lee los contenidos del input
  const onChangeProyecto = (e) => {
    setError(false);
    setProyecto({ ...proyecto, [e.target.name]: e.target.value });
  };

  // El usuario envia un protecto
  const onSubmitProyecto = (e) => {
    e.preventDefault();

    // Validar el proyecto
    if (nombre.trim() === "") {
      setError(true);
      return;
    }

    // Agregar al state

    // Reinicar el form
    setProyecto({
      nombre: "",
    });
  };

  return (
    <>
      <button type="button" className="btn btn-block btn-primario">
        Nuevo Proyecto
      </button>

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
          value="Agregar Proyecto"
          className="btn btn-primario btn-block"
        />
      </form>
    </>
  );
};

export default NuevoProyecto;
