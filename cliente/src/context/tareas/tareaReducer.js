import { TAREAS_PROYECTO } from "./../../types";

export default (state, action) => {
  switch (action.type) {
    case TAREAS_PROYECTO:
      return {};
    default:
      return state;
  }
};
