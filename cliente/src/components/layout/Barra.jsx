import React, { useContext, useEffect } from "react";
import AuthContext from "./../../context/autenticacion/authContext";

const Barra = () => {
  const { usuario, usuarioAutenticado, cerrarSesion } = useContext(AuthContext);

  // Autenticar al usuario incluso si recargamos la app
  useEffect(() => {
    usuarioAutenticado();
    // eslint-disable-next-line
  }, []);

  return (
    <header className="app-header">
      {usuario ? (
        <p className="nombre-usuario">
          Hola <span>{usuario.nombre}</span>
        </p>
      ) : null}

      <nav className="nav-principal">
        <button
          className="btn btn-blank cerrar-sesion"
          onClick={() => cerrarSesion()}
        >
          Cerrar Sesion
        </button>
      </nav>
    </header>
  );
};

export default Barra;
