import React, { useReducer } from "react";

import proyectoContext from "./proyectoContext";
import proyectoReducer from "./proyectoReducer";
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  PROYECTO_ERROR,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
  EDICION_PROYECTO,
  ACTUALIZAR_PROYECTO,
} from "./../../types";

import clienteAxios from "./../../config/axios";

const ProyectoState = ({ children }) => {
  const initialState = {
    proyectos: [],
    formulario: false,
    errorformulario: false,
    proyecto: null,
    mensaje: null,
    edicion: false,
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

  const edicionFormulario = () => {
    dispatch({
      type: EDICION_PROYECTO,
    });
  };

  // Obtener los proyectos
  const obtenerProyectos = async () => {
    try {
      const resultado = await clienteAxios.get("/api/proyectos");

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: resultado.data.proyectos,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Agregar Nuevo Proyecto
  const agregarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.post("/api/proyectos", proyecto);
      console.log(resultado);
      // Insertar el proyecto en el state
      dispatch({
        type: AGREGAR_PROYECTO,
        payload: resultado.data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Valida el formulario por errores
  const mostrarError = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  // Seleccionar el proyecto seleccionado
  const proyectoActual = (proyectoId) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: proyectoId,
    });
  };

  // Elimina un proyecto
  const eliminarProyecto = async (proyectoId) => {
    try {
      await clienteAxios.delete(`/api/proyectos/${proyectoId}`);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  // Actualizar un proyecto
  const actualizarProyecto = async (proyecto) => {
    try {
      const resultado = await clienteAxios.put(
        `/api/proyectos/${proyecto._id}`,
        proyecto
      );
      dispatch({
        type: ACTUALIZAR_PROYECTO,
        payload: resultado.data.proyecto,
      });
    } catch (error) {
      const alerta = {
        msg: "Hubo un error",
        categoria: "alerta-error",
      };

      dispatch({
        type: PROYECTO_ERROR,
        payload: alerta,
      });
    }
  };

  return (
    <proyectoContext.Provider
      value={{
        proyectos: state.proyectos,
        formulario: state.formulario,
        errorformulario: state.errorformulario,
        proyecto: state.proyecto,
        mensaje: state.mensaje,
        edicion: state.edicion,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        mostrarError,
        proyectoActual,
        eliminarProyecto,
        edicionFormulario,
        actualizarProyecto,
      }}
    >
      {children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
