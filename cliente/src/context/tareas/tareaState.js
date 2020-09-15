import React, { useReducer } from "react";

import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import {
  TAREAS_PROYECTO,
  AGREGAR_TAREA,
  VALIDAR_TAREA,
  ELIMINAR_TAREA,
} from "./../../types";

const TareaState = ({ children }) => {
  const initialState = {
    tareas: [
      { id: 0, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { id: 1, nombre: "Elegir Colores", estado: false, proyectoId: 2 },
      {
        id: 2,
        nombre: "Elegir Plataformas de pago",
        estado: false,
        proyectoId: 3,
      },
      { id: 3, nombre: "Elegir Hosting", estado: true, proyectoId: 4 },
      { id: 4, nombre: "Elegir Plataforma", estado: true, proyectoId: 1 },
      { id: 5, nombre: "Elegir Colores", estado: false, proyectoId: 2 },
      {
        id: 6,
        nombre: "Elegir Plataformas de pago",
        estado: false,
        proyectoId: 3,
      },
      { id: 7, nombre: "Elegir Plataforma", estado: true, proyectoId: 4 },
      { id: 8, nombre: "Elegir Colores", estado: false, proyectoId: 1 },
      {
        id: 9,
        nombre: "Elegir Plataformas de pago",
        estado: false,
        proyectoId: 2,
      },
      { id: 10, nombre: "Elegir Plataforma", estado: true, proyectoId: 3 },
      { id: 11, nombre: "Elegir Colores", estado: false, proyectoId: 4 },
      {
        id: 12,
        nombre: "Elegir Plataformas de pago",
        estado: false,
        proyectoId: 3,
      },
    ],
    tareasproyecto: null,
    errortarea: false,
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  // Crear las funciones

  // Obtener las tareas de un proyecto
  const obtenerTareas = (proyectoId) => {
    dispatch({
      type: TAREAS_PROYECTO,
      payload: proyectoId,
    });
  };

  // Agregar una tarea al proyecto seleccionado
  const agregarTarea = (tarea) => {
    dispatch({
      type: AGREGAR_TAREA,
      payload: tarea,
    });
  };

  // Valida y muestra un error en caso de que sea necesario
  const validarTarea = () => {
    dispatch({
      type: VALIDAR_TAREA,
    });
  };

  // Eliminar tarea por Id
  const eliminarTarea = (id) => {
    dispatch({
      type: ELIMINAR_TAREA,
      payload: id,
    });
  };

  return (
    <tareaContext.Provider
      value={{
        tareas: state.tareas,
        tareasproyecto: state.tareasproyecto,
        errortarea: state.errortarea,
        obtenerTareas,
        agregarTarea,
        validarTarea,
        eliminarTarea,
      }}
    >
      {children}
    </tareaContext.Provider>
  );
};

export default TareaState;