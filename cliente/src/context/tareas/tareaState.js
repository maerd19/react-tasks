import React, { useReducer } from "react";

import tareaContext from "./tareaContext";
import tareaReducer from "./tareaReducer";
import {} from "./../../types";

const TareaState = ({ children }) => {
  const initialState = {
    tareas: [],
  };

  const [state, dispatch] = useReducer(tareaReducer, initialState);

  return <tareaContext.Provider value={{}}>{children}</tareaContext.Provider>;
};

export default TareaState;
