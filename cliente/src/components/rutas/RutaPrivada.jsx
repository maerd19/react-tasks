import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "./../../context/autenticacion/authContext";

// Higher Order Component: Una funcion toma un componente como argumento y regresa un nuevo componente
const RutaPrivada = ({ component: Component, ...props }) => {
  const { autenticado, cargando, usuarioAutenticado } = useContext(AuthContext);

  useEffect(() => {
    usuarioAutenticado();
  }, []);

  return (
    <Route
      {...props}
      render={(props) =>
        // Si el usuario no esta autenticado se envia hacia la pagina principal
        // Si esta autenticado se renderiza el componente que lo mando a llamar
        !autenticado && !cargando ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RutaPrivada;
