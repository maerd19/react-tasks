import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "./../../context/alertas/alertaContext";
import AuthContext from "./../../context/autenticacion/authContext";

const Login = () => {
  // Extraer los valores del context
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { mensaje, autenticado, iniciarSesion } = useContext(AuthContext);

  // State para iniciar sesion
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });

  // Extraer de usuario
  const { email, password } = usuario;

  // Se agregan los valores al State
  const onChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  // El usuario inicia sesion
  const onSubmit = (e) => {
    e.preventDefault();
    // Validacion de campos vacios
    if (email.trim() === "" || password.trim() === "") {
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }
    // Pasar al action
    iniciarSesion({ email, password });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesion</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tu Email"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Tu Password"
              value={password}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar sesion"
            />
          </div>
        </form>

        <Link to={"/nueva-cuenta"} className="enlace-cuenta">
          Obtener Nueva Cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
