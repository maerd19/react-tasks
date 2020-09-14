import React, { useContext } from "react";

import proyectoContext from "./../../context/proyectos/proyectoContext";

const FormTarea = () => {
  // Extraer si un proyecto esta activo
  const { proyecto } = useContext(proyectoContext);

  // Si no hay proyecto seleccionado
  if (!proyecto) return null;

  return (
    <div className="formulario">
      <form>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
          />
        </div>

        <div className="contenedor-input">
          <input
            type="submit"
            value="Agregar Tarea"
            className="btn btn-primario btn-submit btn-block"
          />
        </div>
      </form>
    </div>
  );
};

export default FormTarea;
