import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "./../../context/alertas/alertaContext";
import AuthContext from "./../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  // Extraer los valores del context
  const { alerta, mostrarAlerta } = useContext(AlertaContext);
  const { mensaje, autenticado, registrarUsuario } = useContext(AuthContext);

  // En caso de que el usuario se haya autenticado o regostrado o sea un registro duplicado
  useEffect(() => {
    if (autenticado) {
      props.history.push("/proyectos");
    }

    if (mensaje) {
      mostrarAlerta(mensaje.msg, mensaje.categoria);
    }

    // Al usar reactRouterDOM tenemos acceso a props.history
  }, [mensaje, autenticado, props.history]);

  // State para iniciar sesion
  const [usuario, setUsuario] = useState({
    email: "",
    password: "",
    confirmar: "",
    nombre: "",
  });

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
      mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
      return;
    }

    // Password minimo de 6 caracteres
    if (password.length < 6) {
      mostrarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
    }

    // Los 2 campos de password son iguales
    if (password !== confirmar) {
      mostrarAlerta("Los passwords no son iguales", "alerta-error");
    }

    // Pasar al action
    registrarUsuario({
      nombre,
      email,
      password,
    });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
      ) : null}
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
              type="submit"
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
