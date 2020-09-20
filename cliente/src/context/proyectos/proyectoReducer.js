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

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };
    case EDICION_PROYECTO:
      return {
        ...state,
        formulario: true,
        edicion: true,
      };
    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectos: action.payload,
      };
    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectos: [...state.proyectos, action.payload],
        formulario: false,
        errorformulario: false,
      };
    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorformulario: true,
      };
    case PROYECTO_ACTUAL:
      return {
        ...state,
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === action.payload
        ),
        edicion: false,
        formulario: false,
      };
    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectos: state.proyectos.filter(
          (proyecto) => proyecto._id !== action.payload
        ),
        proyecto: null,
      };
    case PROYECTO_ERROR:
      return {
        ...state,
        mensaje: action.payload,
      };
    case ACTUALIZAR_PROYECTO:
      let proyectos = state.proyectos.map((proyecto) =>
        proyecto._id === action.payload._id ? action.payload : proyecto
      );
      console.log("proyectos", proyectos);
      console.log("proyecto", state.proyecto[0]);
      let proyecto = state.proyectos.filter(
        (proyecto) => proyecto._id === state.proyecto[0]._id
      );
      console.log(proyecto);
      return {
        ...state,
        proyectos: state.proyectos.map((proyecto) =>
          proyecto._id === action.payload._id ? action.payload : proyecto
        ),
        proyecto: state.proyectos.filter(
          (proyecto) => proyecto._id === state.proyecto[0]._id
        ),
        formulario: false,
        errorformulario: false,
        edicion: false,
      };
    default:
      return state;
  }
};
