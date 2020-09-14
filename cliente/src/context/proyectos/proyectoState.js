import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import { FORMULARIO_PROYECTO } from "./../../types";

const ProyectoState = ({ children }) => {
  const initialState = {
    proyectos: [
      { id: 1, nombre: "Tienda Virtual" },
      { id: 2, nombre: "Intranet" },
      { id: 3, nombre: "Diseno de Sitio Web" },
      { id: 4, nombre: "MERN" },
    ],
    formulario: false,
  };

  // State y dispatch se obtienen del hook useReducer
  // Dispatch ejecuta las acciones del Reducer
  // La funcion del reducer es cambiar el state
  const [state, dispatch] = useReducer(proyectoReducer, initialState);

  // Serie de funciones para el CRUD
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        mostrarFormulario,
      }}
    >
      {children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
