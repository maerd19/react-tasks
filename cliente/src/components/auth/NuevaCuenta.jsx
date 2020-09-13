import React, { useState } from "react";
import { Link } from "react-router-dom";

const NuevaCuenta = () => {
  // State para iniciar sesion
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
    confirmar: "",
    nombre: "",
  });
  const [error, setError] = useState(false);

  // Extraer de usuario
  const { email, password, confirmar, nombre } = usuario;

  // Se agregan los valores al State
  const onChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  // El usuario inicia sesion
  const onSubmit = (e) => {
    e.preventDefault();
    // Validacion de campos vacios
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      confirmar.trim() === "" ||
      nombre.trim() === ""
    ) {
      setError(true);
      return;
    }

    // Password minimo de 6 caracteres

    // Los 2 campos de password son iguales

    // Pasar al action
  };

  return (
    <div className="form-usuario">
      <div className="contenedor-form sombra-dark">
        <h1>Obtener una cuenta</h1>

        <form onSubmit={onSubmit}>
          <div className="campo-form">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              placeholder="Tu nombre"
              value={nombre}
              onChange={onChange}
            />
          </div>

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
            <label htmlFor="confirmar">Confirmar Password</label>
            <input
              type="password"
              id="confirmar"
              name="confirmar"
              placeholder="Repite tu Password"
              value={confirmar}
              onChange={onChange}
            />
          </div>

          <div className="campo-form">
            <input
              type="text"
              className="btn btn-primario btn-block"
              value="Registrarme"
            />
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Volver a Iniciar Sesion
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
