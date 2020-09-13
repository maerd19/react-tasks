import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // State para iniciar sesion
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);

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
      setError(true);
      return;
    }
    // Pasar al action
  };

  return (
    <div className="form-usuario">
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
              type="text"
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
